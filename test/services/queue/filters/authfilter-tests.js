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

var duplex = require('duplex');

var azure = testutil.libRequire('azure');
var WebResource = testutil.libRequire('http/webresource');
var authFilter = testutil.libRequire('services/queue/filters/authfilter');

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
      webResource = WebResource.get('container')
        .withQueryOption(QueryStringConstants.RESTYPE, 'container')
        .withHeader(HeaderConstants.CONTENT_TYPE, '')
        .withHeader(HeaderConstants.STORAGE_VERSION_HEADER, HeaderConstants.TARGET_STORAGE_VERSION)
        .withHeader(HeaderConstants.DATE_HEADER, 'Fri, 23 Sep 2011 01:37:34 GMT');

      returnedStream = filter(webResource, baseFilterBehavior.sink, function (err) {
        filterErrResult = err;
        done();
      });
      baseFilterBehavior.returnStream.on('data', onSinkData);
      returnedStream.on('data', onReceivedData);
    });

    it('should not return error', function () {
      should.not.exist(filterErrResult);
    });

    it('should add authentication header', function () {
      webResource.headers[HeaderConstants.AUTHORIZATION].should.equal(
        'SharedKey devstoreaccount1:Y5R86+6XE5MH602SIyjeTwlJuQjbawv20PT4kb/F/04=');
    });

    var writtenToSink;
    var receivedFromSink;

    function onSinkData(data) {
      console.log('recieved data from client', data.value);
      writtenToSink = data.value;
      data.done();
    }

    function onReceivedData(data) {
      console.log('received data from sink', data.value);
      receivedFromSink = data.value;
      data.done();
    }

    after(function () {
      baseFilterBehavior.returnStream.removeListener('data', onSinkData);
      returnedStream.removeListener('data', onReceivedData);
    });

    it('should return a writable stream through to result' //, function (done) {
      // baseFilterBehavior.returnStream.write({
      //   value: 'an arbitrary value',
      //   done: function () {
      //     console.log('data is sent');
      //     receivedFromSink.should.equal('an arbitrary value');
      //     done();
      //   }
      // }
    );
  });
});

describe('exploring duplex', function () {
  var stream;
  var received;

  function onStreamData(data) {
    console.log('received data', data.value);
    received = data.value;
    data.received();
  }

  beforeEach(function () {
    stream = duplex(function (data) { stream._data(data); });
    stream.on('data', onStreamData);
  });

  it('should receive when written to', function (done) {
    stream.write({
      value: 'a value',
      received: function () {
        received.should.equal('a value');
        done();
      }
    });
  });
});
