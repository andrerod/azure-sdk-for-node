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

'use strict';
var _ = require('underscore');
var fmt = require('util').format;
var url = require('url');
var constants = require('../../../util/constants');
var HeaderConstants = constants.HeaderConstants;
var moduleVersion = require('../../../../package.json').version;

function _getPath(path, storageAccount, usePathStyleUri) {
  if (path === null || path === undefined) {
    path = '/';
  } else if (path.indexOf('/') !== 0) {
    path = '/' + path;
  }

  if (usePathStyleUri) {
    path = '/' + storageAccount + path;
  }

  return path;
}

/**
* Create filters that calculates the final Url to send the request to
*
* @param {string} protocol the protocol to use
* @param {string} host to send to
* @param {number} port to connect to
* @param {string} storageAccount being sent to
* @param {boolean} usePathStyleUri flag controlling path format
*
* @return {function} The filter function
*/
function setRequestUrlFilter(storageEndpoint, storageSettings) {
  return function (resource, next, callback) {
    if (!resource.requestUrl) {
      // Normalize the path
      resource.path = _getPath(resource.path, storageSettings._name, storageSettings.__usePathStyleUri);

      var baseUrl = url.parse(storageEndpoint);

      // Build the full request url
      resource.requestUrl = url.format({
        protocol: baseUrl.protocol,
        hostname: baseUrl.hostname,
        port: baseUrl.port,
        pathname: resource.path,
        query: resource.queryString
      });
    }
    return next(resource, callback);
  };
}

// Filter that adds the user-agent header
function userAgentFilter(resource, next, callback) {
  resource.withHeader(HeaderConstants.USER_AGENT, fmt('Azure-SDK-For-Node.js/%s', moduleVersion));
  return next(resource, callback);
}

// Set the default headers required for a storage call
function defaultHeadersFilter(storageEndpoint, apiVersion) {
  return function (resource, next, callback) {
    if (!resource.headers || !resource.headers[HeaderConstants.CONTENT_TYPE]) {
      resource.withHeader(HeaderConstants.CONTENT_TYPE, '');
    }

    if (!resource.headers || resource.headers[HeaderConstants.CONTENT_LENGTH] === undefined) {
      resource.withHeader(HeaderConstants.CONTENT_LENGTH, 0);
    } else if (resource.headers && resource.headers[HeaderConstants.CONTENT_LENGTH] === null) {
      delete resource.headers[HeaderConstants.CONTENT_LENGTH];
    }

    resource.withHeader(HeaderConstants.STORAGE_VERSION_HEADER, apiVersion);
    resource.withHeader(HeaderConstants.DATE_HEADER, new Date().toUTCString());
    resource.withHeader(HeaderConstants.ACCEPT_HEADER, 'application/atom+xml,application/xml');
    resource.withHeader(HeaderConstants.ACCEPT_CHARSET_HEADER, 'UTF-8');

    var parsedUrl = url.parse(storageEndpoint);
    resource.withHeader(HeaderConstants.HOST_HEADER, parsedUrl.hostname + ':' + parsedUrl.port);

    return next(resource, callback);
  };
}

_.extend(exports, {
  setRequestUrlFilter: setRequestUrlFilter,
  userAgentFilter: userAgentFilter,
  defaultHeadersFilter: defaultHeadersFilter
});
