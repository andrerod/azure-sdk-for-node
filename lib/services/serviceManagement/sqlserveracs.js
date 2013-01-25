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
var url = require('url');

var azureutil = require('../../util/util');

var ServiceClient = require('../core/serviceclient');

var WebResource = require('../../http/webresource');
var Constants = require('../../util/constants');
var QueryStringConstants = Constants.QueryStringConstants;
var HttpConstants = Constants.HttpConstants;
var HeaderConstants = Constants.HeaderConstants;

// Expose 'SqlServerAcs'.
exports = module.exports = SqlServerAcs;

/**
* Creates a new SqlServerAcs object.
*
* @param {string} acsHost                      The access control host.
* @param {string} serverName                   The SQL server name.
* @param {string} administratorLogin           The administrator login.
* @param {string} administratorLoginPassword   The administrator login password.
*/
function SqlServerAcs(acsHost, serverName, administratorLogin, administratorLoginPassword) {
  this.acsHost = acsHost;
  this.serverName = serverName;
  this.administratorLogin = administratorLogin;
  this.administratorLoginPassword = administratorLoginPassword;

  SqlServerAcs.super_.call(this, acsHost);
}

util.inherits(SqlServerAcs, ServiceClient);

/**
* Signs a request with the Authentication header.
* 
* @param {WebResource} The webresource to be signed.
* @return {undefined}
*/
SqlServerAcs.prototype.signRequest = function (webResource, callback) {
  console.log('i was asked to sign');

  var escapedLogin = escapeConnectionCredentials(this.administratorLogin);
  var escapedLoginPassword = escapeConnectionCredentials(this.administratorLoginPassword);

  var escapedCredentials = escapedLogin + ':' + escapedLoginPassword;

  var encodedCredentials = new Buffer(escapedCredentials).toString('base64');

  webResource.addOptionalHeader('sqlauthorization', encodedCredentials);

  var processResponseCallback = function (responseObject, next) {
    // TODO: set whatever is needed on the webresource
    console.log(responseObject.response);

    var finalCallback = function (returnObject) {
      callback(returnObject.error);
    };

    next(responseObject, finalCallback);
  };

  this.performRequest(webResource, null, null, processResponseCallback);
};

function escapeConnectionCredentials(value) {
  return value.replace(/\/g, /\\/g).replace(/:/g, /\:/g);
}