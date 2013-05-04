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
var should = require('should');
var duplexer = require('duplexer');
var through = require('through');

var topStream = through();
var bottomStream = through();

var expectedReturn = duplexer(bottomStream, topStream);
exports.testStream = duplexer(topStream, bottomStream);

exports.verifyFilter = function () {
  it('should return value from sink', function () {
    this.filterReturn.should.equal(expectedReturn);
  });
};

exports.sink = function (options, callback) {
  process.nextTick(function () { callback(null, null, null, null); });
  return expectedReturn;
}

exports.returnStream = expectedReturn;