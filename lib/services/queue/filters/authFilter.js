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
var pauseStream = require('pause-stream');

/**
* Creates filter to do signing signing
*
*/
// Todo: make generic - pass in authentication provider, not parameters
function authFilter(authenticationProvider) {

  return function (resource, next, callback) {
    var returnStream = pauseStream().pause();

// TODO: All our auth providers are sync. Why are we using a callback?
// Are we guaranteed that signRequest will always be synchronous? If
// so we can ditch the intermediate stream and the nextTick call.
    authenticationProvider.signRequest(resource, function (err) {
      // Force return to be async, otherwise we might lose data
      // that was written to the resumed pause stream before
      // returned client got their hands on it.
      process.nextTick(function () {
        if (err) {
          return callback(err);
        }
        var actualStream = next(resource, callback);
        returnStream.pipe(actualStream).pipe(returnStream);
        returnStream.resume();
      });
    });
    return returnStream;
  };
}

exports.authFilter = authFilter;
