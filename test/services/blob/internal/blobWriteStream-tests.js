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

var assert = require('assert');

var fs = require('fs');
var path = require('path');
var util = require('util');
var sinon = require('sinon');
var url = require('url');

var request = require('request');

// Test includes
var testutil = require('../../../util/util');

// Lib includes
var BlobWriteStream = testutil.libRequire('services/blob/internal/blobWriteStream');

describe('BlobWriteStream', function () {
  describe('write', function () {
    it('should correctly split a stream', function (done) {
      var blobWriteStream = new BlobWriteStream({ writeBlockSizeInBytes: 2 });
      blobWriteStream.write('my very long and awesome strings ');
      blobWriteStream.end();

      done();
    });
  });
});