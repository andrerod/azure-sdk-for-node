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

// Module dependencies.
var _ = require('underscore');
var url = require('url');

var azureutil = require('../../../util/util');
var HeaderConstants = require('../../../util/constants').HeaderConstants;
var HmacSha256Sign = require('../../core/hmacsha256sign');

/**
* Creates a new SharedKey object.
*
* @constructor
* @param {string} storageAccount    The storage account.
* @param {string} storageAccessKey  The storage account's access key.
* @param {bool}   usePathStyleUri   Boolean value indicating if the path, or the hostname, should include the storage account.
*/
function SharedKey(storageAccount, storageAccessKey, usePathStyleUri) {
  this.storageAccount = storageAccount;
  this.storageAccessKey = storageAccessKey;
  this.usePathStyleUri = usePathStyleUri;
  this.signer = new HmacSha256Sign(storageAccessKey);
}

/**
* Signs a request with the Authentication header.
*
* @param {WebResource} The webresource to be signed.
* @param {function(error)}  callback  The callback function.
* @return {undefined}
*/
SharedKey.prototype.signRequest = function (options, callback) {
  var getvalueToAppend = function (value) {
    if (azureutil.objectIsNull(value)) {
      return '\n';
    } else {
      return value + '\n';
    }
  };

  var stringToSign =
    options.method + '\n' +
    getvalueToAppend(options.headers[HeaderConstants.CONTENT_ENCODING]) +
    getvalueToAppend(options.headers[HeaderConstants.CONTENT_LANGUAGE]) +
    getvalueToAppend(options.headers[HeaderConstants.CONTENT_LENGTH]) +
    getvalueToAppend(options.headers[HeaderConstants.CONTENT_MD5]) +
    getvalueToAppend(options.headers[HeaderConstants.CONTENT_TYPE]) +
    getvalueToAppend(options.headers[HeaderConstants.DATE]) +
    getvalueToAppend(options.headers[HeaderConstants.IF_MODIFIED_SINCE]) +
    getvalueToAppend(options.headers[HeaderConstants.IF_MATCH]) +
    getvalueToAppend(options.headers[HeaderConstants.IF_NONE_MATCH]) +
    getvalueToAppend(options.headers[HeaderConstants.IF_UNMODIFIED_SINCE]) +
    getvalueToAppend(options.headers[HeaderConstants.RANGE]) +
    this._getCanonicalizedHeaders(options) +
    this._getCanonicalizedResource(options);

  var signature = this.signer.sign(stringToSign);

  webResource.withHeader(HeaderConstants.AUTHORIZATION, 'SharedKey ' + this.storageAccount + ':' + signature);
  callback(null);
};

/*
* Retrieves the webresource's canonicalized resource string.
* @param {WebResource} webResource The webresource to get the canonicalized resource string from.
* @return {string} The canonicalized resource string.
*/
SharedKey.prototype._getCanonicalizedResource = function (options) {
  var path = '/';
  if (options.uri) {
    path = options.uri;
  }

  var canonicalizedResource = '/' + this.storageAccount + path;

  var canonicalizedResource = this._getCanonicalizedPath(options);

  // Get the raw query string values for signing
  var queryStringValues = options.qs;

  // Build the canonicalized resource by sorting the values by name.
  if (queryStringValues) {
    var paramNames = Object.keys(queryStringValues).sort();
    canonicalizedResource += paramNames.reduce(function (prev, new) {
      return prev + '\n' + name + ':' + queryStringValues[name];
    }, '');
  }

  return canonicalizedResource;
};

SharedKey.prototype._getCanonicalizedPath = function (options) {
  var url = 
};

/*
* Constructs the Canonicalized Headers string.
*
* To construct the CanonicalizedHeaders portion of the signature string,
* follow these steps: 1. Retrieve all headers for the resource that begin
* with x-ms-, including the x-ms-date header. 2. Convert each HTTP header
* name to lowercase. 3. Sort the headers lexicographically by header name,
* in ascending order. Each header may appear only once in the
* string. 4. Unfold the string by replacing any breaking white space with a
* single space. 5. Trim any white space around the colon in the header. 6.
* Finally, append a new line character to each canonicalized header in the
* resulting list. Construct the CanonicalizedHeaders string by
* concatenating all headers in this list into a single string.
*
* @param {object} The webresource object.
* @return {string} The canonicalized headers.
*/
SharedKey.prototype._getCanonicalizedHeaders = function (options) {
  // Build canonicalized headers
  var canonicalizedHeaders = '';
  if (options.headers) {
    var canonicalizedHeadersArray = [];
    for (var header in options.headers) {
      if (header.indexOf(HeaderConstants.PREFIX_FOR_STORAGE_HEADER) === 0) {
        canonicalizedHeadersArray.push(header);
      }
    }

    canonicalizedHeadersArray.sort();

    _.each(canonicalizedHeadersArray, function (currentHeader) {
      canonicalizedHeaders += currentHeader.toLowerCase() + ':' + options.headers[currentHeader] + '\n';
    });
  }

  return canonicalizedHeaders;
};

module.exports = SharedKey;