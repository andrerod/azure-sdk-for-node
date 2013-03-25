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
var azureutil = require('../util/util');
var Constants = require('../util/constants');
var HeaderConstants = Constants.HeaderConstants;
var HttpConstants = Constants.HttpConstants;

function encodeSpecialCharacters(path) {
  return path.replace(/'/g, '%27');
}

/**
* Creates a new Request object.
*
* This class provides an abstraction over a REST call by being library / implementation agnostic and wrapping the necessary
* properties to initiate a request.
*
* @constructor
*/
function Request() {
  this.rawResponse = false;
  this.queryString = {};
}

/**
* Creates a new put request web resource.
*
* @param {string} path The path for the put operation.
* @return {Request} A new request with a put operation for the given path.
*/
Request.put = function (path) {
  var request = new Request();
  request.path = path ? encodeSpecialCharacters(path) : null;
  request.httpVerb = HttpConstants.HttpVerbs.PUT;
  request.okCodes = [HttpConstants.HttpResponseCodes.Created];
  return request;
};

/**
* Creates a new get request web resource.
*
* @param {string} path The path for the get operation.
* @return {Request} A new request with a get operation for the given path.
*/
Request.get = function (path) {
  var request = new Request();
  request.path = path ? encodeSpecialCharacters(path) : null;
  request.httpVerb = HttpConstants.HttpVerbs.GET;
  request.okCodes = [HttpConstants.HttpResponseCodes.Ok];
  return request;
};

/**
* Creates a new head request web resource.
*
* @param {string} path The path for the head operation.
* @return {Request} A new request with a head operation for the given path.
*/
Request.head = function (path) {
  var request = new Request();
  request.path = path ? encodeSpecialCharacters(path) : null;
  request.httpVerb = HttpConstants.HttpVerbs.HEAD;
  request.okCodes = [HttpConstants.HttpResponseCodes.Ok];
  return request;
};

/**
* Creates a new delete request web resource.
*
* @param {string} path The path for the delete operation.
* @return {Request} A new request with a delete operation for the given path.
*/
Request.del = function (path) {
  var request = new Request();
  request.path = path ? encodeSpecialCharacters(path) : null;
  request.httpVerb = HttpConstants.HttpVerbs.DELETE;
  request.okCodes = [HttpConstants.HttpResponseCodes.NoContent];
  return request;
};

/**
* Creates a new post request web resource.
*
* @param {string} path The path for the post operation.
* @return {Request} A new request with a post operation for the given path.
*/
Request.post = function (path) {
  var request = new Request();
  request.path = path ? encodeSpecialCharacters(path) : null;
  request.httpVerb = HttpConstants.HttpVerbs.POST;
  request.okCodes = [HttpConstants.HttpResponseCodes.Created];
  return request;
};

/**
* Creates a new merge request web resource.
*
* @param {string} path The path for the merge operation.
* @return {Request} A new request with a merge operation for the given path.
*/
Request.merge = function (path) {
  var request = new Request();
  request.path = path ? encodeSpecialCharacters(path) : null;
  request.httpVerb = HttpConstants.HttpVerbs.MERGE;
  request.okCodes = [HttpConstants.HttpResponseCodes.Created];
  return request;
};

/**
* Specifies the response status codes that are valid for the given web request.
*
* @param {int}  okCode The expected ok code.
* @param {bool} append true if the ok code should be appended to a list of many; false if it should replace any previous ok code.
* @return {Request} The request.
*/
Request.prototype.withOkCode = function (okCode, append) {
  if (!this.okCodes || !append) {
    this.okCodes = [];
  }

  this.okCodes.push(okCode);
  return this;
};

/**
* Specifies a custom property in the web resource.
*
* @param {string} name  The property name.
* @param {string} value The property value.
* @return {Request} The request.
*/
Request.prototype.withProperty = function (name, value) {
  if (!this.properties) {
    this.properties = {};
  }

  this.properties[name] = value;

  return this;
};

/**
* Specifies if the response should be parsed or not.
*
* @param {bool} rawResponse true if the response should not be parse; false otherwise.
* @return {Request} The request.
*/
Request.prototype.withRawResponse = function (rawResponse) {
  if (rawResponse) {
    this.rawResponse = rawResponse;
  } else {
    this.rawResponse = true;
  }

  return this;
};

/**
* Adds an optional query string parameter.
*
* @param {Object} name          The name of the query string parameter.
* @param {Object} value         The value of the query string parameter.
* @param {Object} defaultValue  The default value for the query string parameter to be used if no value is passed.
* @return {Object} The request.
*/
Request.prototype.withQueryOption = function (name, value, defaultValue) {
  if (!azureutil.objectIsNull(value)) {
    this.queryString[name] = value;
  } else if (defaultValue) {
    this.queryString[name] = defaultValue;
  }

  return this;
};

/**
* Adds optional query string parameters.
*
* @param {Object} name  The name of the query string parameter.
* @param {Object} value The value of the query string parameter.
* @return {Object} The request.
*/
Request.prototype.withQueryOptions = function (object) {
  if (object) {
    for (var i = 1; i < arguments.length; i++) {
      if (object[arguments[i]]) {
        this.withQueryOption(arguments[i], object[arguments[i]]);
      }
    }
  }

  return this;
};

/**
* Adds an optional header parameter.
*
* @param {Object} name  The name of the header parameter.
* @param {Object} value The value of the header parameter.
* @return {Object} The request.
*/
Request.prototype.withHeader = function (name, value) {
  if (!this.headers) {
    this.headers = {};
  }

  if (value !== undefined && value !== null) {
    this.headers[name] = value;
  }

  return this;
};

/**
* Adds optional headers parameter.
*
* @param {Object} name  The name of the header parameter.
* @param {Object} value The value of the header parameter.
* @return {Object} The request.
*/
Request.prototype.withHeaders = function (object) {
  if (object) {
    for (var i = 1; i < arguments.length; i++) {
      if (object[arguments[i]]) {
        this.withHeader(arguments[i], object[arguments[i]]);
      }
    }
  }

  return this;
};

Request.prototype.addOptionalMetadataHeaders = function (metadata) {
  var self = this;

  if (metadata) {
    Object.keys(metadata).forEach(function (metadataHeader) {
      self.withHeader(HeaderConstants.PREFIX_FOR_STORAGE_METADATA + metadataHeader.toLowerCase(), metadata[metadataHeader]);
    });
  }

  return this;
};

// TODO: deprecate
Request.prototype.addOptionalAccessConditionHeader = function (accessConditionHeaders) {
  var ifMatch = azureutil.tryGetValueInsensitive(HeaderConstants.IF_MATCH, accessConditionHeaders);
  if (ifMatch) {
    this.withHeader(HeaderConstants.IF_MATCH, ifMatch);
  }

  var ifModifiedSince = azureutil.tryGetValueInsensitive(HeaderConstants.IF_MODIFIED_SINCE, accessConditionHeaders);
  if (ifModifiedSince) {
    this.withHeader(HeaderConstants.IF_MODIFIED_SINCE, ifModifiedSince);
  }

  var ifNoneMatch = azureutil.tryGetValueInsensitive(HeaderConstants.IF_NONE_MATCH, accessConditionHeaders);
  if (ifNoneMatch) {
    this.withHeader(HeaderConstants.IF_NONE_MATCH, ifNoneMatch);
  }

  var ifUnmodifiedSince = azureutil.tryGetValueInsensitive(HeaderConstants.IF_UNMODIFIED_SINCE, accessConditionHeaders);
  if (ifUnmodifiedSince) {
    this.withHeader(HeaderConstants.IF_UNMODIFIED_SINCE, ifUnmodifiedSince);
  }
};

// TODO: deprecate
Request.prototype.addOptionalSourceAccessConditionHeader = function (accessConditionHeaders) {
  var sourceIfMatch = azureutil.tryGetValueInsensitive(HeaderConstants.SOURCE_IF_MATCH_HEADER, accessConditionHeaders);
  if (sourceIfMatch) {
    this.withHeader(HeaderConstants.SOURCE_IF_MATCH_HEADER, sourceIfMatch);
  }

  var sourceIfModifiedSince = azureutil.tryGetValueInsensitive(HeaderConstants.SOURCE_IF_MODIFIED_SINCE_HEADER, accessConditionHeaders);
  if (sourceIfModifiedSince) {
    this.withHeader(HeaderConstants.SOURCE_IF_MODIFIED_SINCE_HEADER, sourceIfModifiedSince);
  }

  var sourceIfNoneMatch = azureutil.tryGetValueInsensitive(HeaderConstants.SOURCE_IF_NONE_MATCH_HEADER, accessConditionHeaders);
  if (sourceIfNoneMatch) {
    this.withHeader(HeaderConstants.SOURCE_IF_NONE_MATCH_HEADER, sourceIfNoneMatch);
  }

  var sourceIfUnmodifiedSince = azureutil.tryGetValueInsensitive(HeaderConstants.SOURCE_IF_UNMODIFIED_SINCE_HEADER, accessConditionHeaders);
  if (sourceIfUnmodifiedSince) {
    this.withHeader(HeaderConstants.SOURCE_IF_UNMODIFIED_SINCE_HEADER, sourceIfUnmodifiedSince);
  }
};

/**
* Determines if a status code corresponds to a valid response according to the Request's expected status codes.
*
* @param {int} statusCode The response status code.
* @return true if the response is valid; false otherwise.
*/
Request.prototype.validResponse = function (statusCode) {
  for (var i in this.okCodes) {
    if (this.okCodes[i] == statusCode) {
      return true;
    }
  }

  return false;
};

module.exports = Request;