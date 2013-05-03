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

var request = require('request');
var _ = require('underscore');
var util = require('util');
var dump = util.inspect;

//
// Request pipelines are functions that allow you to
// add filters to modify requests and responses
// before / after the actual HTTP request.
//

/**
 *
 * Figure out which of the three possible overloads:
 * 1) uri, options, callback - everything passed
 * 2) options, callback - assumed uri is in the options already
 * 3) uri, callback - we'll have to set up the options
 *
 * was passed to this function, and return object containing
 * options and callback, ready to go.
 */
function normalizeArguments(uri, options, callback) {
  var result = {};
  if(_.isString(uri) && _.isObject(options) && _.isFunction(callback)) {
    result.options = options;
    result.options.uri = uri;
    result.callback = callback;
  } else if (_.isObject(uri) && _.isFunction(options)) {
    result.callback = options;
    result.options = uri;
  } else if (_.isString(uri) && _.isFunction(options)) {
    result.callback = options;
    result.options = { uri: uri };
  } else {
    throw new Error('Invalid parameter set passed');
  }

  // We must always have headers
  result.options.headers = result.options.headers || {};
  return result;
}

/**
 *
 * create a new http client pipeline that ends with a call to the
 * request library using the given sink function to actually make
 * the http request.
 *
 * @return function(request, callback) - function to make a request.
 *
 */
function createWithSink(sink) {
  var pipeline = sink;

  // The function that actually runs the pipeline. It starts simple
  function runFilteredRequest(uri, options, callback) {
    var args = normalizeArguments(uri, options, callback);
    return pipeline(args.options, args.callback);
  }

  function makeFilteredPipeline(filter) {
    var currentPipeline = pipeline;
    return function (options, callback) {
      filter(options, currentPipeline, callback);
    };
  }

  // Add 'add' method so we can add filters.
  runFilteredRequest.add = function () {
    _.each(arguments, function (filter) {
      pipeline = makeFilteredPipeline(filter);
    });
  };

  // Add verb specific helper methods
  var verbs = ['get', 'post', 'delete', 'put', 'merge', 'head'];
  verbs.forEach(function (method) {
    runFilteredRequest[method] = (function (m) {
      return function (uri, options, callback) {
        var args = normalizeArguments(uri, options, callback);
        args.options.method = m;
        return pipeline(args.options, args.callback);
      };
    })(method.toUpperCase());
  });

  // If user passed any other parameters, assume they're filters
  // and add them.
  for(var i = 1; i < arguments.length; ++i) {
    runFilteredRequest.add(arguments[i]);
  }

  return runFilteredRequest;
}

/**
 * This function acts as the final sink for a request, actually
 * going out over the wire.
 *
 * @private
 * @param options The request to perform
 * @param callback function(err, result, response, body) callback function that
 * will be called at completion of the request.
 */

function requestLibrarySink(options, callback) {
  return request(options, function (err, response, body) {
    if (err) { return callback(err); }
    return callback(null, null, response, body);
  });
}

/**
 *
 * create a new http client pipeline that ends with a call to the
 * request library.
 *
 * @return function(request, callback) - function to make a request.
 *
 */
function create() {
  if (arguments.length === 0 ) {
    return createWithSink(requestLibrarySink);
  }
  // User passed filters to add to the pipeline.
  // build up appropriate arguments and call createWithSink
  return createWithSink.apply(null, [requestLibrarySink].concat(_.toArray(arguments)));
}

/**
 * logFilter = simple filter to do logging on requests, responses
 *
 * @param options - options object for request
 * @param next - next filter function in chain
 * @param callback - callback to invoke to return response
 *
 */
function logFilter(options, next, callback) {
  console.log('logFilter, request: %s', dump(options));
  return next(options, function (err, result, response, body) {
    if (err) {
      console.log('Error from response, message: ' + err.message);
      return callback(err);
    }

    console.log('Response status code: ' + response.statusCode);
    console.log('Body: ' + body);
    return callback(err, result, response, body);
  });
}

_.extend(exports, {
  create: create,
  createWithSink: createWithSink,
  logFilter: logFilter
});
