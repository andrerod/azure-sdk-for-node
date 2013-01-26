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
var url = require('url');
var _ = require('underscore');

var SqlServerDatabaseClient = require('../core/sqlserverdatabaseclient');
var WebResource = require('../../http/webresource');
var ServiceClient = require('../core/serviceclient');

var AtomHandler = require('../../util/atomhandler');
var js2xml = require('../../util/js2xml');
var Constants = require('../../util/constants');
var HttpConstants = Constants.HttpConstants;
var HeaderConstants = Constants.HeaderConstants;

var feedparser = require('feedparser');

var parseserverresponse = require('./models/parseserverresponse');

// Expose 'SqlServerDatabaseService'.
exports = module.exports = SqlServerDatabaseService;

/**
*
* Creates a new SqlServerDatabaseService object
*
* @constructor
* @param {string} serverName                   The SQL server name.
* @param {string} administratorLogin           The SQL Server administrator login.
* @param {string} administratorLoginPassword   The SQL Server administrator login password.
* @param {string} host                         The host for the service.
* @param {string} acsHost                      The acs host.
* @param {object} [authenticationProvider]     The authentication provider.
*/

function SqlServerDatabaseService(serverName, administratorLogin, administratorLoginPassword, host, acsHost, authenticationProvider) {
  this.serverName = serverName;

  var endpoint = url.format({ protocol: 'https:', port: 443, hostname: serverName + '.' + ServiceClient.CLOUD_DATABASE_HOST });
  var acsEndpoint = url.format({ protocol: 'https:', port: 443, hostname: serverName + '.' + ServiceClient.CLOUD_DATABASE_HOST });

  SqlServerDatabaseService.super_.call(this,
    serverName,
    administratorLogin,
    administratorLoginPassword,
    endpoint,
    acsEndpoint,
    authenticationProvider);
}

util.inherits(SqlServerDatabaseService, SqlServerDatabaseClient);


/**
* Gets a SQL Server database.
*
* @param {string}   serverName          The server name.
* @param {function} callback            function (err, results, response) The callback function called on completion. Required.
*/
SqlServerDatabaseService.prototype.listServerDatabases = function (callback) {
  var path = '/v1/ManagementService.svc/Server2(\'' + this.serverName + '\')/Databases';
  var webResource = WebResource.get(path);

  webResource.addOptionalHeader('DataServiceVersion', '1.0;NetFx');
  webResource.addOptionalHeader('DataServiceVersion', '2.0;NetFx');

  webResource.withOkCode(HttpConstants.HttpResponseCodes.OK_CODE, true);

  var processResponseCallback = function (responseObject, next) {
    if (!responseObject.error) {
      responseObject.databases = [];

      var entries = [];
      if (responseObject.response.body.feed && responseObject.response.body.feed.entry) {
        entries = responseObject.response.body.feed.entry;
      } else if (responseObject.response.body.entry) {
        entries = [responseObject.response.body.entry];
      }

      var atomHandler = new AtomHandler();
      _.each(entries, function (entry) {
        responseObject.databases.push(atomHandler.parse(entry));
      });
    }

    var finalCallback = function (returnObject) {
      callback(returnObject.error, returnObject.databases, returnObject.response);
    };

    next(responseObject, finalCallback);
  };

  this._performRequestExtended(webResource, null, null, processResponseCallback);
};

SqlServerDatabaseService.prototype._performRequestExtended = function (webResource, rawData, options, callback) {
  if (!webResource.headers || !webResource.headers[HeaderConstants.DATA_SERVICE_VERSION]) {
    webResource.addOptionalHeader(HeaderConstants.DATA_SERVICE_VERSION, '1.0;NetFx');
  }

  if (!webResource.headers || !webResource.headers[HeaderConstants.MAX_DATA_SERVICE_VERSION]) {
    webResource.addOptionalHeader(HeaderConstants.MAX_DATA_SERVICE_VERSION, '2.0;NetFx');
  }

  this.performRequest(webResource, rawData, options, callback);
};