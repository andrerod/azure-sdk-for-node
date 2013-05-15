/**
* Copyright (c) Microsoft.  All rights reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

// Module dependencies.
var util = require('util');
var _ = require('underscore');

var azureutil = require('../../util/util');
var validate = require('../../util/validate');

var ServiceClient = require('../core/serviceclient');
var StorageServiceClient = require('../core/storageserviceclient');
var SharedKey = require('../blob/internal/sharedkey');
var WebResource = require('../../http/webresource');
var Constants = require('../../util/constants');
var QueryStringConstants = Constants.QueryStringConstants;
var HttpConstants = Constants.HttpConstants;
var HeaderConstants = Constants.HeaderConstants;

var requestPipeline = require('../../http/request-pipeline');
var storageFilters = require('./filters/storagefilters');
var authFilter = require('./filters/authFilter');
var webResourceToOptionsFilter = require('../../http/webresourcetooptionsfilter');
var xml2jsFilter = require('./filters/xml2jsFilter');
// Models requires
var ListQueuesResultContinuation = require('./models/listqueuesresultcontinuation');
var QueueResult = require('./models/queueresult');
var QueueMessageResult = require('./models/queuemessageresult');
var servicePropertiesResult = require('./models/servicepropertiesresult');

/**
* Creates a new QueueService object.
* If no storageAccount or storageAccessKey are provided, the AZURE_STORAGE_ACCOUNT and AZURE_STORAGE_ACCESS_KEY
* environment variables will be used.
*
* @constructor
* @augments {ServiceClient}
*
* @param {string} [storageAccountOrConnectionString]  The storage account or the connection string.
* @param {string} [storageAccessKey]                  The storage access key.
* @param {string} [host]                              The host address.
* @param {object} [authenticationProvider]            The authentication provider.
*/
function QueueService(storageAccountOrConnectionString, storageAccessKey, host, authenticationProvider) {
  var storageServiceSettings = StorageServiceClient.getStorageSettings(storageAccountOrConnectionString, storageAccessKey, host);

  QueueService['super_'].call(this,
    storageServiceSettings._name,
    storageServiceSettings._key,
    storageServiceSettings._queueEndpointUri,
    storageServiceSettings._usePathStyleUri,
    authenticationProvider);

  if (!this.authenticationProvider) {
    this.authenticationProvider = new SharedKey(this.storageAccount, this.storageAccessKey, this.usePathStyleUri);
  }

  this.pipeline = requestPipeline.create(
//    requestPipeline.logFilter,
    xml2jsFilter(ServiceClient.defaultXml2jsSettings()),
    webResourceToOptionsFilter,
    authFilter(this.authenticationProvider),
    storageFilters.setRequestUrlFilter(this.protocol, this.host, this.port),
    storageFilters.defaultHeadersFilter(this.apiVersion, this.host, this.port),
    storageFilters.userAgentFilter
  );
}

util.inherits(QueueService, StorageServiceClient);

/**
* Associate a filtering operation with this ServiceClient. Filtering operations
* can include logging, automatically retrying, etc. Filter operations are functions
* the signature:
*
*     "function (requestOptions, next, callback)".
*
* After doing its preprocessing on the request options, the method needs to call
* "next" passing the current options and a callback with the following signature:
*
*     "function (error, result, response, body)"
*
* In this callback, and after processing the result or response, the callback needs
* invoke the original passed in callback to continue processing other filters and
* finish up the service invocation.
*
* @param {function (requestOptins, next, callback)} filter The new filter object.
* @return {QueueService} A new service client with the filter applied.
*/
QueueService.prototype.withFilter = function (newFilter) {
  if (azureutil.objectIsNull(newFilter)) {
    throw new Error('No filter passed');
  }
  if (!(newFilter instanceof Function && newFilter.length === 3)) {
    throw new Error('newFilter must be a function taking three parameters');
  }

  var newService = Object.create(QueueService.prototype);
  newService.pipeline = requestPipeline.createWithSink(this.pipeline, newFilter);
  return newService;
};

/**
* Gets the properties of a storage account’s Queue service, including Windows Azure Storage Analytics.
*
* @this {BlobService}
* @param {object|function}    [optionsOrCallback]                        The request options or callback function.
* @param {int}                [optionsOrCallback.timeoutIntervalInMs]    The timeout interval, in milliseconds, to use for the request.
* @param {function(error, servicePropertiesResult, response)}  callback  The callback function.
* @return {undefined}
*/
QueueService.prototype.getServiceProperties = function (optionsOrCallback, callback) {
  var options;
  azureutil.normalizeArgs(optionsOrCallback, callback, function (o, c) { options = o; callback = c; });

  validateCallback(callback);

  var webResource = WebResource.get()
    .withQueryOption(QueryStringConstants.COMP, 'properties')
    .withQueryOption(QueryStringConstants.RESTYPE, 'service');

  this.pipeline(webResource, function (err, result) {
    if (!err) {
      callback(null, servicePropertiesResult.parse(result.StorageServiceProperties));
    } else {
      callback(err);
    }
  });
};

/**
* Sets the properties of a storage account’s Queue service, including Windows Azure Storage Analytics.
* You can also use this operation to set the default request version for all incoming requests that do not have a version specified.
*
* @this {BlobService}
* @param {object}             serviceProperties                        The service properties.
* @param {object|function}    [optionsOrCallback]                      The request options or callback function.
* @param {int}                [optionsOrCallback.timeoutIntervalInMs]  The timeout interval, in milliseconds, to use for the request.
* @param {function(error, response)}  callback                         The callback function.
* @return {undefined}
*/
QueueService.prototype.setServiceProperties = function (serviceProperties, optionsOrCallback, callback) {
  var options;
  azureutil.normalizeArgs(optionsOrCallback, callback, function (o, c) { options = o; callback = c; });

  validate.validateArgs('setServiceProperties', function (v) {
    v.callback(callback);
  });

  var servicePropertiesXml = servicePropertiesResult.serialize(serviceProperties);

  var webResource = WebResource.put()
    .withQueryOption(QueryStringConstants.COMP, 'properties')
    .withQueryOption(QueryStringConstants.RESTYPE, 'service')
    .withHeader(HeaderConstants.CONTENT_TYPE, 'application/xml;charset="utf-8"')
    .withHeader(HeaderConstants.CONTENT_LENGTH, Buffer.byteLength(servicePropertiesXml))
    .withBody(servicePropertiesXml);

  var processResponseCallback = function (responseObject, next) {
    var finalCallback = function (returnObject) {
      callback(returnObject.error, returnObject.response);
    };

    next(responseObject, finalCallback);
  };

  this.performRequest(webResource, servicePropertiesXml, options, processResponseCallback);
};

/**
* Lists all queues under the given account.
*
* @this {QueueService}
* @param {object|function}    [optionsOrCallback]                         The listing and request options.
* @param {string}             [optionsOrCallback.prefix]                  Filters the results to return only queues whose name begins with the specified prefix.
* @param {string}             [optionsOrCallback.marker]                  String value that identifies the portion of the list to be returned with the next list operation.
* @param {int}                [optionsOrCallback.maxresults]              Specifies the maximum number of queues to return per call to Azure storage. This does NOT affect list size returned by this function. (maximum: 5000)
* @param {string}             [optionsOrCallback.include]                 Include this parameter to specify that the queue's metadata be returned as part of the response body. (allowed values: '', 'metadata')
* @param {int}                [optionsOrCallback.timeoutIntervalInMs]     The timeout interval, in milliseconds, to use for the request.
* @param {function(error, queueResults, nextMarker, response)}  callback  The callback function.
* @return {undefined}
*/
QueueService.prototype.listQueues = function (optionsOrCallback, callback) {
  var options;
  azureutil.normalizeArgs(optionsOrCallback, callback, function (o, c) { options = o; callback = c; });

  validate.validateArgs('listQueues', function (v) {
    v.callback(callback);
  });

  var webResource = WebResource.get();
  webResource.withQueryOption(QueryStringConstants.COMP, 'list');
  webResource.withQueryOptions(options,
    QueryStringConstants.PREFIX,
    QueryStringConstants.MARKER,
    QueryStringConstants.MAX_RESULTS,
    QueryStringConstants.INCLUDE);

  var self = this;

  this.pipeline(webResource, function (err, result, response) {
    if (err) { return callback(err); }
    var listQueueResult = [];
    if (result.EnumerationResults.Queues && result.EnumerationResults.Queues.Queue) {
      var queues = result.EnumerationResults.Queues.Queue;
      if (!_.isArray(queues)) {
        queues = [queues];
      }

      queues.forEach(function (currentQueue) {
        var queueResult = QueueResult.parse(currentQueue);
        listQueueResult.push(queueResult);
      });
    }
    var continuation = new ListQueuesResultContinuation(self, options, result.EnumerationResults.NextMarker);
    callback(err, listQueueResult, continuation, response);
  });
};

/**
* Creates a new queue under the given account.
*
* @this {QueueService}
* @param {string}             queue                                       The queue name.
* @param {object|function}    [optionsOrCallback]                         The create and request options.
* @param {object}             [optionsOrCallback.metadata]                The metadata key/value pairs.
* @param {int}                [optionsOrCallback.timeoutIntervalInMs]     The timeout interval, in milliseconds, to use for the request.
* @param {function(error, queueResult, response)}  callback               The callback function.
* @return {undefined}
*/
QueueService.prototype.createQueue = function (queue, optionsOrCallback, callback) {
  var options;
  azureutil.normalizeArgs(optionsOrCallback, callback, function (o, c) { options = o; callback = c; });

  validate.validateArgs('createQueue', function (v) {
    v.string(queue, 'queue');
    v.queueNameIsValid(queue);
    v.callback(callback);
  });

  var webResource = WebResource.put(queue)
    .withBody(null);
  if (options) {
    webResource.addOptionalMetadataHeaders(options.metadata);
  }

  this.pipeline(webResource, function (err, result, response) {
    if (err) { return callback(err, null, response); }
    var queueResult = new QueueResult(queue);
    if (options && options.metadata) {
      queueResult.metadata = options.metadata;
    }
    callback(err, queueResult, response);
  });
};

/**
* Creates a new queue under the given account if it doesn't exist.
*
* @this {QueueService}
* @param {string}             queue                                       The queue name.
* @param {object|function}    [optionsOrCallback]                         The create and request options.
* @param {object}             [optionsOrCallback.metadata]                The metadata key/value pairs.
* @param {int}                [optionsOrCallback.timeoutIntervalInMs]     The timeout interval, in milliseconds, to use for the request.
* @param {function(error, queueCreated, response)}  callback              The callback function.
* @return {undefined}
*/
QueueService.prototype.createQueueIfNotExists = function (queue, optionsOrCallback, callback) {
  var options;
  azureutil.normalizeArgs(optionsOrCallback, callback, function (o, c) { options = o; callback = c; });

  validate.validateArgs('createQueueIfNotExists', function (v) {
    v.string(queue, 'queue');
    v.queueNameIsValid(queue);
    v.callback(callback);
  });

  // Create WebResource specifying an additional ok code for the already created scenario.
  var webResource = WebResource.put(queue)
    .withBody(null);

  if (options) {
    webResource.addOptionalMetadataHeaders(options.metadata);
  }

  this.pipeline(webResource, function (err, result, response) {
    var queueCreated = response.statusCode === HttpConstants.HttpResponseCodes.Created;
    if (response.statusCode === HttpConstants.HttpResponseCodes.Created || response.statusCode === HttpConstants.HttpResponseCodes.NoContent) {
      err = null;
    }
    callback(err, queueCreated, response);
  });
};

/**
* Permanently deletes the specified queue.
*
* @this {QueueService}
* @param {string}             queue                                       The queue name.
* @param {object|function}    [optionsOrCallback]                         The delete and request options.
* @param {int}                [optionsOrCallback.timeoutIntervalInMs]     The timeout interval, in milliseconds, to use for the request.
* @param {function(error, deleted, response)}  callback                   The callback function.
* @return {undefined}
*/
QueueService.prototype.deleteQueue = function (queue, optionsOrCallback, callback) {
  var options;
  azureutil.normalizeArgs(optionsOrCallback, callback, function (o, c) { options = o; callback = c; });

  validate.validateArgs('deleteQueue', function (v) {
    v.string(queue, 'queue');
    v.queueNameIsValid(queue);
    v.callback(callback);
  });

  var webResource = WebResource.del(queue);
  this.pipeline(webResource, function (err, result, response) {
    callback(err, response.isSuccessful, response);
  });
};

/**
* Returns queue properties, including user-defined metadata.
*
* @this {QueueService}
* @param {string}             queue                                       The queue name.
* @param {object|function}    [optionsOrCallback]                         The get and request options.
* @param {int}                [optionsOrCallback.timeoutIntervalInMs]     The timeout interval, in milliseconds, to use for the request.
* @param {function(error, queueResult, response)}  callback               The callback function.
* @return {undefined}
*/
QueueService.prototype.getQueueMetadata = function (queue, optionsOrCallback, callback) {
  var options;
  azureutil.normalizeArgs(optionsOrCallback, callback, function (o, c) { options = o; callback = c; });

  validate.validateArgs('getQueueMetadata', function (v) {
    v.string(queue, 'queue');
    v.queueNameIsValid(queue);
    v.callback(callback);
  });

  var webResource = WebResource.get(queue)
    .withQueryOption(QueryStringConstants.COMP, 'metadata');

  var self = this;
  this.pipeline(webResource, function (err, result, response) {
    var queueResult = null;
    if (!err) {
      queueResult = new QueueResult(queue);
      queueResult.metadata = self.parseMetadataHeaders(response.headers);
      queueResult.getPropertiesFromHeaders(response.headers);
    }
    callback(err, queueResult, response);
  });
};

/**
* Sets user-defined metadata on the specified queue. Metadata is associated with the queue as name-value pairs.
*
* @this {QueueService}
* @param {string}             queue                                       The queue name.
* @param {object}             metadata                                    The metadata key/value pairs.
* @param {object|function}    [optionsOrCallback]                         The set and request options.
* @param {int}                [optionsOrCallback.timeoutIntervalInMs]     The timeout interval, in milliseconds, to use for the request.
* @param {function(error, queueResult, response)}  callback               The callback function.
* @return {undefined}
*/
QueueService.prototype.setQueueMetadata = function (queue, metadata, optionsOrCallback, callback) {
  var options;
  azureutil.normalizeArgs(optionsOrCallback, callback, function (o, c) { options = o; callback = c; });

  validate.validateArgs('setQueueMetadata', function (v) {
    v.string(queue, 'queue');
    v.queueNameIsValid(queue);
    v.callback(callback);
  });

  var webResource = WebResource.put(queue)
    .withQueryOption(QueryStringConstants.COMP, 'metadata')
    .addOptionalMetadataHeaders(metadata)
    .withBody(null);

  this.pipeline(webResource, function (err, result, response) {
    var queueResult = null;
    if (!err) {
      queueResult = new QueueResult(queue, metadata);
      queueResult.getPropertiesFromHeaders(response.headers);
    }
    callback(err, queueResult, response);
  });
};

/**
* Adds a new message to the back of the message queue. A visibility timeout can also be specified to make the message
* invisible until the visibility timeout expires. A message must be in a format that can be included in an XML request
* with UTF-8 encoding. The encoded message can be up to 64KB in size for versions 2011-08-18 and newer, or 8KB in size
* for previous versions.
*
* @this {QueueService}
* @param {string}             queue                                       The queue name.
* @param {object}             messageText                                 The message text.
* @param {object|function}    [optionsOrCallback]                         The put and request options.
* @param {int}                [optionsOrCallback.messagettl]              The time-to-live interval for the message, in seconds. The maximum time-to-live allowed is 7 days. If this parameter is omitted, the default time-to-live is 7 days
* @param {int}                [optionsOrCallback.visibilitytimeout]       Specifies the new visibility timeout value, in seconds, relative to server time. The new value must be larger than or equal to 0, and cannot be larger than 7 days. The visibility timeout of a message cannot be set to a value later than the expiry time. visibilitytimeout should be set to a value smaller than the time-to-live value.
* @param {int}                [optionsOrCallback.timeoutIntervalInMs]     The timeout interval, in milliseconds, to use for the request.
* @param {function(error, queueMessageResult, response)}  callback        The callback function.
* @return {undefined}
*/
QueueService.prototype.createMessage = function (queue, messageText, optionsOrCallback, callback) {
  var options;
  azureutil.normalizeArgs(optionsOrCallback, callback, function (o, c) { options = o; callback = c; });

  validate.validateArgs('createMessage', function (v) {
    v.string(queue, 'queue');
    v.queueNameIsValid(queue);
    v.callback(callback);
  });

  var xmlMessageDescriptor = QueueMessageResult.serialize(messageText);

  var webResource = WebResource.post(queue + '/messages')
    .withHeader(HeaderConstants.CONTENT_TYPE, 'application/atom+xml;charset="utf-8"')
    .withHeader(HeaderConstants.CONTENT_LENGTH, Buffer.byteLength(xmlMessageDescriptor, 'utf8'))
    .withQueryOptions(options, QueryStringConstants.MESSAGE_TTL, QueryStringConstants.VISIBILITY_TIMEOUT)
    .withBody(xmlMessageDescriptor);

  this.pipeline(webResource, function (err, result, response) {
    var queueMessageResult = null;
    if (!err) {
      queueMessageResult = new QueueMessageResult(queue);
      queueMessageResult.getPropertiesFromHeaders(response.headers);
    }
    callback(err, queueMessageResult, response);
  });
};

/**
* Retrieves a message from the queue and makes it invisible to other consumers.
*
* @this {QueueService}
* @param {string}             queue                                       The queue name.
* @param {object|function}    [optionsOrCallback]                         The get and request options.
* @param {int}                [optionsOrCallback.numofmessages]           A nonzero integer value that specifies the number of messages to retrieve from the queue, up to a maximum of 32. By default, a single message is retrieved from the queue with this operation.
* @param {bool}               [optionsOrCallback.peekonly]                Boolean value indicating wether the visibility of the message should be changed or not.
* @param {int}                [optionsOrCallback.visibilitytimeout]       Required if not peek only. Specifies the new visibility timeout value, in seconds, relative to server time. The new value must be larger than or equal to 0, and cannot be larger than 7 days. The visibility timeout of a message can be set to a value later than the expiry time.
* @param {int}                [optionsOrCallback.timeoutIntervalInMs]     The timeout interval, in milliseconds, to use for the request.
* @param {function(error, queueMessageResults, response)}  callback       The callback function.
* @return {undefined}
*/
QueueService.prototype.getMessages = function (queue, optionsOrCallback, callback) {
  var options;
  azureutil.normalizeArgs(optionsOrCallback, callback, function (o, c) { options = o; callback = c; });

  validate.validateArgs('getMessages', function (v) {
    v.string(queue, 'queue');
    v.queueNameIsValid(queue);
    v.callback(callback);
  });

  var webResource = WebResource.get(queue + '/messages')
    .withQueryOptions(options, QueryStringConstants.NUM_OF_MESSAGES, QueryStringConstants.VISIBILITY_TIMEOUT);
  if (options) {
    webResource.withQueryOption(QueryStringConstants.PEEK_ONLY, options[QueryStringConstants.PEEK_ONLY]);
  }

  this.pipeline(webResource, function (err, result, response) {
    var queueMessageResults = null;
    if (!err) {
      queueMessageResults = [];
      if (result.QueueMessagesList && result.QueueMessagesList.QueueMessage) {
        var messages = result.QueueMessagesList.QueueMessage;
        if (!_.isArray(messages)) {
          messages = [messages];
        }
        queueMessageResults = messages.map(function (m) { return QueueMessageResult.parse(m); });
      }
    }
    callback(err, queueMessageResults, response);
  });
};

/**
* Retrieves a message from the front of the queue, without changing the message visibility.
*
* @this {QueueService}
* @param {string}             queue                                       The queue name.
* @param {object|function}    [optionsOrCallback]                         The peek and request options.
* @param {int}                [optionsOrCallback.numofmessages]           A nonzero integer value that specifies the number of messages to retrieve from the queue, up to a maximum of 32. By default, a single message is retrieved from the queue with this operation.
* @param {int}                [optionsOrCallback.timeoutIntervalInMs]     The timeout interval, in milliseconds, to use for the request.
* @param {function(error, queueMessageResults, response)}  callback       The callback function.
* @return {undefined}
*/
QueueService.prototype.peekMessages = function (queue, optionsOrCallback, callback) {
  var options;
  azureutil.normalizeArgs(optionsOrCallback, callback, function (o, c) { options = o; callback = c; });

  if (!options) {
    options = {};
  }

  if (!options[QueryStringConstants.NUM_OF_MESSAGES]) {
    options[QueryStringConstants.NUM_OF_MESSAGES] = 1;
  }

  options[QueryStringConstants.PEEK_ONLY] = true;
  this.getMessages(queue, options, callback);
};

/**
* Deletes a specified message from the queue.
*
* @this {QueueService}
* @param {string}             queue                                       The queue name.
* @param {string}             messageid                                   The message identifier of the message to delete.
* @param {string}             popreceipt                                  A valid pop receipt value returned from an earlier call to the Get Messages or Update Message operation
* @param {object|function}    [optionsOrCallback]                         The delete and request options.
* @param {int}                [optionsOrCallback.timeoutIntervalInMs]     The timeout interval, in milliseconds, to use for the request.
* @param {function(error, successful, response)}  callback                The callback function.
* @return {undefined}
*/
QueueService.prototype.deleteMessage = function (queue, messageid, popreceipt, optionsOrCallback, callback) {
  var options;
  azureutil.normalizeArgs(optionsOrCallback, callback, function (o, c) { options = o; callback = c; });

  validate.validateArgs('deleteMessage', function (v) {
    v.string(queue, 'queue');
    v.queueNameIsValid(queue);
    v.callback(callback);
  });

  if (!popreceipt) {
    throw new Error('A message retrieved using \'peekMessages\' can not be deleted! Use \'getMessages\' instead.');
  }

  var webResource = WebResource.del(queue + '/messages/' + messageid)
    .withQueryOption(QueryStringConstants.POP_RECEIPT, popreceipt, null, true);

  this.pipeline(webResource, function (err, result, response) {
    callback(err, response.isSuccessful, response);
  });
};

/**
* Clears all messages from the queue.
*
* @this {QueueService}
* @param {string}             queue                                       The queue name.
* @param {object|function}    [optionsOrCallback]                         The delete and request options.
* @param {int}                [optionsOrCallback.timeoutIntervalInMs]     The timeout interval, in milliseconds, to use for the request.
* @param {function(error, response)}  callback                            The callback function.
* @return {undefined}
*/
QueueService.prototype.clearMessages = function (queue, optionsOrCallback, callback) {
  var options;
  azureutil.normalizeArgs(optionsOrCallback, callback, function (o, c) { options = o; callback = c; });

  validate.validateArgs('clearMessages', function (v) {
    v.string(queue, 'queue');
    v.queueNameIsValid(queue);
    v.callback(callback);
  });

  var webResource = WebResource.del(queue + '/messages');
  this.pipeline(webResource, function (err, result, response) {
    callback(err, response);
  });
};

/**
* Updates the visibility timeout of a message. You can also use this operation to update the contents of a message.
* A message must be in a format that can be included in an XML request with UTF-8 encoding, and the encoded message can be up to 64KB in size.
*
* @this {QueueService}
* @param {string}             queue                                       The queue name.
* @param {string}             messageid                                   The message identifier of the message to update.
* @param {string}             popreceipt                                  A valid pop receipt value returned from an earlier call to the Get Messages or Update Message operation
* @param {int}                visibilitytimeout                           Specifies the new visibility timeout value, in seconds, relative to server time. The new value must be larger than or equal to 0, and cannot be larger than 7 days. The visibility timeout of a message can be set to a value later than the expiry time.
* @param {object|function}    [optionsOrCallback]                         The delete and request options.
* @param {object|function}    [optionsOrCallback.messagetext]             The new message text.
* @param {int}                [optionsOrCallback.timeoutIntervalInMs]     The timeout interval, in milliseconds, to use for the request.
* @param {function(error, queueMessageResult, response)}  callback        The callback function.
* @return {undefined}
*/
QueueService.prototype.updateMessage = function (queue, messageid, popreceipt, visibilitytimeout, optionsOrCallback, callback) {
  var options;
  azureutil.normalizeArgs(optionsOrCallback, callback, function (o, c) { options = o; callback = c; });

  validate.validateArgs('updateMessage', function (v) {
    v.string(queue, 'queue');
    v.queueNameIsValid(queue);
    v.callback(callback);
  });

  var content = null;
  if (options && options.messagetext) {
    content = QueueMessageResult.serialize(options.messagetext);
  }

  var contentLength = content ? Buffer.byteLength(content, 'utf8') : 0;

  var webResource = WebResource.put(queue + '/messages/' + messageid)
    .withHeader(HeaderConstants.CONTENT_TYPE, 'application/atom+xml;charset="utf-8"')
    .withHeader(HeaderConstants.CONTENT_LENGTH, contentLength)
    .withQueryOption(QueryStringConstants.POP_RECEIPT, popreceipt, null, true)
    .withQueryOption(QueryStringConstants.VISIBILITY_TIMEOUT, visibilitytimeout)
    .withBody(content);

  this.pipeline(webResource, function (err, result, response) {
    var queueMessageResult = null;
    if (!err) {
      queueMessageResult = new QueueMessageResult(queue, messageid);
      queueMessageResult.getPropertiesFromHeaders(response.headers);
    }
    callback(err, queueMessageResult, response);
  });
};

module.exports = QueueService;
