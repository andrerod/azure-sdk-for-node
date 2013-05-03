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
var constants = require('../../util/constants');
var headerConstants = constants.HeaderConstants;
var moduleVersion = require('../../../package.json').version;

// Filter that adds the default set of headers for a storage
// request

function defaultUrlFilter(protocol, host, port) {
  return function (options, next, callback) {
    var path = options.uri;
    options.uri = fmt('%s//%s:%d/%s', protocol, host, port, path);
    return next(options, callback);
  };
}

function setHeaderDefault(options, headerName, defaultValue) {
  if (!options.headers.hasOwnProperty(headerName)) {
    options.headers[headerName] = defaultValue;
  }
}

// Filter that adds the user-agent header
function userAgentFilter(options, next, callback) {
  setHeaderDefault(options, headerConstants.USER_AGENT, fmt('Azure-SDK-For-Node.js/%s', moduleVersion));
  return next(options, callback);
}

// Set the default headers required for a storage call
function defaultHeadersFilter(apiVersion, host, port) {
  return function (options, next, callback) {
    setHeaderDefault(options, headerConstants.CONTENT_TYPE, '');

    var contentLengthHeader = options.headers[headerConstants.CONTENT_LENGTH];
    if (_.isUndefined(contentLengthHeader)) {
      options.headers[headerConstants.CONTENT_LENGTH] = 0;
    } else if (_.isNull(contentLengthHeader)) {
      delete options.headers[headerConstants.CONTENT_LENGTH];
    }

    options.headers[headerConstants.STORAGE_VERSION_HEADER] = apiVersion;
    options.headers[headerConstants.DATE_HEADER] = new Date().toUTCString();
    options.headers[headerConstants.ACCEPT_HEADER] = 'application/atom+xml,application/xml';
    options.headers[headerConstants.ACCEPT_CHARSET_HEADER] = 'UTF-8';
    options.headers[headerConstants.HOST_HEADER] = fmt('%s:%d', host, port);

    return next(options, callback);
  };
}

_.extend(exports, {
  defaultUrlFilter: defaultUrlFilter,
  userAgentFilter: userAgentFilter,
  defaultHeadersFilter: defaultHeadersFilter
});
