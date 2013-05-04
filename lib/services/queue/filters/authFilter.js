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
var through = require('through');
var duplexer = require('duplexer');

/**
* Creates filter to do signing signing
*
*/
function authFilter(authenticationProvider) {

  return function (resource, next, callback) {
    var fromNextToCallerStream = through();
    var fromCallerToNextStream = through();

    var returnToCallerStream = duplexer(fromCallerToNextStream, fromNextToCallerStream);
    var pipeToActualStream = duplexer(fromNextToCallerStream, fromCallerToNextStream);

    authenticationProvider.signRequest(resource, function (err) {
      // Force return to be async, otherwise we might lose data
      // that was written to the resumed pause stream before
      // returned client got their hands on it.
      process.nextTick(function () {
        if (err) {
          return callback(err);
        }
        var actualStream = next(resource, callback);
        if (actualStream) {
          console.log('piping from caller to request stream');
          pipeToActualStream.pipe(actualStream);
          console.log('piping from request stream back to caller');
          actualStream.pipe(pipeToActualStream);
          //console.log('pipes fixed up, resuming stream');
          //fromNextToCallerStream.resume();
          //console.log('stream resumed');
        }
      });
    });
    return returnToCallerStream;
  };
}

module.exports = authFilter;
