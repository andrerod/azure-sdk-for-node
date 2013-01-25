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

var SqlServerDatabaseClient = require('../core/sqlserverdatabaseclient');
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
* @param {string} administratorLogin           The SQL Server administrator login.
* @param {string} administratorLoginPassword   The SQL Server administrator login password.
* @param {string} host                         The host for the service.
* @param {string} acsHost                      The acs host. Usually the same as the sb namespace with "-sb" suffix.
* @param {object} [authenticationProvider]     The authentication provider.
*/

function SqlServerDatabaseService(administratorLogin, administratorLoginPassword, host, acsHost, authenticationProvider) {
  var endpoint = url.format({ protocol: 'https:', port: 443, hostname: namespaceOrConnectionString + '.' + ServiceClient.CLOUD_SERVICEBUS_HOST });


  SqlServerDatabaseService.super_.call(this,
    administratorLogin,
    administratorLoginPassword,
    host,
    acsHost,
    authenticationProvider);
}

util.inherits(SqlServerDatabaseService, SqlServerDatabaseClient);


/**
* Gets a SQL Server database.
*
* @param {string}   serverName          The server name.
* @param {function} callback            function (err, results, response) The callback function called on completion. Required.
*/
SqlServerDatabaseService.prototype.listServerDatabases = function (serverName, callback) {
  var path = 'servers/' + serverName + '/v1/ManagementService.svc/Server2(\'' + serverName + '\')/Databases';
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