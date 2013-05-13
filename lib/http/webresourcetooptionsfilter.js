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
var azureutil = require('../util/util');
var Constants = require('../util/constants');
var HttpResponseCodes = Constants.HttpResponseCodes;

function normalizeError (error) {
  if (azureutil.objectIsString(error)) {
    return new Error(error);
  } else if (error) {
    var normalizedError = {};

    var errorProperties = error.Error || error.error || error;
    for (var property in errorProperties) {
      if (property !== Constants.XML_METADATA_MARKER) {
        var value = null;
        if (errorProperties[property] && errorProperties[property][Constants.XML_VALUE_MARKER]) {
          value = errorProperties[property][Constants.XML_VALUE_MARKER];
        } else {
          value = errorProperties[property];
        }
        normalizedError[property.toLowerCase()] = value;
      }
    }

    var errorMessage = normalizedError.code;
    if (normalizedError.detail) {
      errorMessage += ' - ' + normalizedError.detail;
    }

    var errorObject = new Error(errorMessage);
    _.extend(errorObject, normalizedError);
    return errorObject;
  }

  return null;
}

/**
 * filter to convert a WebResource object into the options
 * format expected by the request library
 *
 * @param {WebResource} webResource the web resource to convert
 * @param {function} next next stage in the pipeline
 * @param {callback} callback to execute on request completion
 *
 * @return {object} the return value from next
 */
function webResourceToRequestOptionsFilter(webResource, next, callback) {
  var options = {};
  options.uri = webResource.requestUrl;
  options.method = webResource.httpVerb;
  options.headers = webResource.headers;

  if (webResource.hasOwnProperty('body')) {
    options.body = webResource.body;
  }

  return next(options, function (err, result, response, body) {
    if (err) {
      return callback (err, result, response, body);
    }
    response.isSuccessful = webResource.validResponse(response.statusCode);
    if (!response.isSuccessful) {
      var errorBody = result;

      if (!errorBody) {
        var code = Object.keys(HttpResponseCodes).filter(function (name) {
          if (HttpResponseCodes[name] === response.statusCode) {
            return name;
          }
        });

        errorBody = { code: code[0] };
      }

      err = normalizeError(errorBody);
    }
    callback(err, result, response, body);
  });
}

module.exports = webResourceToRequestOptionsFilter;