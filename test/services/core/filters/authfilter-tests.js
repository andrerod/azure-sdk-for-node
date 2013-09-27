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
var testutil = require('../../../util/util');
var baseFilterBehavior = require('./baseFilterBehavior');

var azure = testutil.libRequire('azure');
var WebResource = testutil.libRequire('http/webresource');
var authFilter = testutil.libRequire('services/core/filters/authFilter');

var SharedKey = azure.SharedKey;
var ServiceClient = azure.ServiceClient;
var Constants = azure.Constants;
var QueryStringConstants = Constants.QueryStringConstants;
var HeaderConstants = Constants.HeaderConstants;

describe('authFilter', function () {
  var sharedKey;
  var filter;

  before(function () {
    sharedKey = new SharedKey(ServiceClient.DEVSTORE_STORAGE_ACCOUNT, ServiceClient.DEVSTORE_STORAGE_ACCESS_KEY, false);
    filter = authFilter(sharedKey);
  });

  describe('when signing', function () {
    var returnedStream;
    var filterErrResult;
    var webResource;

    before(function (done) {
      webResource = WebResource.put('container')
        .withQueryOption(QueryStringConstants.RESTYPE, 'container')
        .withHeader(HeaderConstants.CONTENT_TYPE, '')
        .withHeader(HeaderConstants.STORAGE_VERSION_HEADER, HeaderConstants.TARGET_STORAGE_VERSION)
        .withHeader(HeaderConstants.DATE_HEADER, 'Fri, 23 Sep 2011 01:37:34 GMT');

      returnedStream = filter(webResource, baseFilterBehavior.sink, function (err) {
        filterErrResult = err;
        done();
      });
      returnedStream.on('data', onReceivedData);
      baseFilterBehavior.testStream.on('data', onSinkData);
    });

    it('should not return error', function () {
      should.not.exist(filterErrResult);
    });

    it('should add authentication header', function () {
      webResource.headers[HeaderConstants.AUTHORIZATION].should.equal(
        'SharedKey devstoreaccount1:L+SN11Iy1kir8wy8UGN+61DjbkBe2gkST4AJ65jbN00=');
    });

    var writtenToSink;
    var receivedFromSink;

    function onSinkData(data) {
      writtenToSink = data.value;
      data.received();
    }

    function onReceivedData(data) {
      receivedFromSink = data.value;
      data.received();
    }

    after(function () {
      returnedStream.removeListener('data', onReceivedData);
    });

    it('should return from filter result stream when sink writes data', function (done) {
      baseFilterBehavior.testStream.write({
        value: 'an arbitrary value',
        received: function () {
          receivedFromSink.should.equal('an arbitrary value');
          done();
        }
      });
    });

    it('should pass data to sink when writing to filter result stream', function (done) {
      returnedStream.write({
        value: 'another arbitrary value',
        received: function () {
          writtenToSink.should.equal('another arbitrary value');
          done();
        }
      });
    });
  });
});
