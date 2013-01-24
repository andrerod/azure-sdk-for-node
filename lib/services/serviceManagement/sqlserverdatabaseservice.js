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
var xml2js = require('xml2js');

var ServiceManagementClient = require('../core/servicemanagementclient');
var WebResource = require('../../http/webresource');

var js2xml = require('../../util/js2xml');
var parseserverresponse = require('./models/parseserverresponse');
var Constants = require('../../util/constants');
var HttpConstants = Constants.HttpConstants;

// Expose 'SqlServerDatabaseService'.
exports = module.exports = SqlServerDatabaseService;

/**
*
* Creates a new SqlServerDatabaseService object
*
* @constructor
* @param {string} subscriptionId   Subscription ID for the account or the connection string
* @param {object} authentication                    The authentication object for the client.
*                                                   {
*                                                     keyfile: 'path to .pem',
*                                                     certfile: 'path to .pem',
*                                                     keyvalue: privatekey value,
*                                                     certvalue: public cert value
*                                                   }
* @param {object} hostOptions                       The host options to override defaults.
*                                                   {
*                                                     host: 'management.core.windows.net',
*                                                     apiversion: '2012-03-01',
*                                                     serializetype: 'XML'
*                                                   }
*/

function SqlServerDatabaseService(subscriptionId, authentication, hostOptions) {
  if (typeof subscriptionId != 'string' || subscriptionId.length === 0) {
    throw new Error('A subscriptionId or a connection string is required');
  }

  if (!hostOptions) {
    hostOptions = { };
  }

  hostOptions.serializetype = 'XML';
  SqlDatabaseService.super_.call(this, authentication, hostOptions);

  this.subscriptionId = subscriptionId;
}

util.inherits(SqlServerDatabaseService, SqlServerDatabaseClient);


/**
* Gets a SQL Server database.
*
* @param {string}   serverName          The server name.
* @param {function} callback            function (err, results, response) The callback function called on completion. Required.
*/
SqlServerDatabaseService.prototype.listServerDatabases = function (serverName, callback) {
  var path = this._makePath('servers') + '/' + serverName + '/v1/ManagementService.svc/Server2(\'' + serverName + '\')/Databases';
  var webResource = WebResource.get(path);
  webResource.addOptionalHeader('DataServiceVersion', '1.0;NetFx');
  webResource.addOptionalHeader('DataServiceVersion', '2.0;NetFx');

  webResource.withOkCode(HttpConstants.HttpResponseCodes.OK_CODE, true);

  this.performRequest(webResource, null, null, function (responseObject, next) {
    if (!responseObject.error) {
      responseObject.database = null;

      console.log(responseObject.response.body);
      /*
      if (responseObject.response.body.ServiceResource) {
        responseObject.database = parseserverresponse(responseObject.response.body.ServiceResource);
      }
      */
    }

    var finalCallback = function (returnObject) {
      callback(returnObject.error, returnObject.database, returnObject.response);
    };

    next(responseObject, finalCallback);
  });
};