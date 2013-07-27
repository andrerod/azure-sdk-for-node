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

var storageFilters = require('../../../../lib/services/queue/filters/storageFilters');
var WebResource = require('../../../../lib/http/webresource');
var HeaderConstants = require('../../../../lib/util/constants').HeaderConstants;

var should = require('should');
var url = require('url');
var util = require('util');

var baseFilterBehavior = require('./baseFilterBehavior');

describe('setRequestUrlFilter', function () {
  var proto = 'http:';
  var host = 'mymachine.example';
  var port = '10000';
  var storageAccount = 'testStorageAccount';

  describe('when the webresource path is blank and pathTypeUri is true', function () {
    var resource;
    var filterReturn;
    var finalUrl;

    before(function (done) {
      resource = WebResource.get();
      var filter = storageFilters.setRequestUrlFilter(proto, host, port,
        storageAccount, true);
        
      this.filterReturn = filter(resource, baseFilterBehavior.sink, function (err, result, response, body) {
        finalUrl = url.parse(resource.requestUrl);
        done();
      });
    });

    baseFilterBehavior.verifyFilter();

    it('should set protocol to http', function () {
      finalUrl.protocol.should.equal(proto);
    });

    it('should set expected host', function () {
      finalUrl.hostname.should.equal(host);
    });

    it('should set expected port', function () {
      finalUrl.port.should.equal(port);
    });

    it('should set path to storage account', function () {
      finalUrl.path.should.equal('/' + storageAccount + '/');
    });
  });
  describe('when the webresource path is blank and pathTypeUri is false', function () {
    var resource;
    var finalUrl;

    before(function (done) {
      resource = WebResource.get();
      var filter = storageFilters.setRequestUrlFilter(proto, host, port,
        storageAccount, false);
        
      filter(resource, baseFilterBehavior.sink, function (err, result, response, body) {
        finalUrl = url.parse(resource.requestUrl);
        done();
      });
    });

    it('should set protocol to http', function () {
      finalUrl.protocol.should.equal(proto);
    });

    it('should set expected host', function () {
      // TODO: Why doesn't this include the right thing?
      // Logic is the same as existing stuff,
      // must be getting set elsewhere.
      finalUrl.hostname.should.equal(host);
    });

    it('should set expected port', function () {
      finalUrl.port.should.equal(port);
    });

    it('should have empty path', function () {
      finalUrl.path.should.equal('/');
    });
  });
});

describe('userAgentFilter', function () {
  var resource;

  before(function (done) {
    resource = WebResource.get();
    this.filterReturn = storageFilters.userAgentFilter(resource, baseFilterBehavior.sink,
      function (err, result, response, body) {
        done();
      }
    );
  });

  baseFilterBehavior.verifyFilter();

  it('should set header in resource', function () {
    resource.headers[HeaderConstants.USER_AGENT].should.match(/Azure-SDK-For-Node\.js/);
  });
});

function createDict() {
  var d = {};
  for(var i = 0; i < arguments.length; i += 2) {
    d[arguments[i]] = arguments[i+1];
  }
  return d;
}

describe('defaultHeadersFilter', function () {
  var resource;
  var filterReturn;
  var expectedAPIVersion = '2099-99-99';
  var host = 'mymachine.example';
  var port = '1234';

  before(function (done) {
    resource = WebResource.get();
    var filter = storageFilters.defaultHeadersFilter(expectedAPIVersion, host, port);
    this.filterReturn = filter(resource, baseFilterBehavior.sink, function () {
      done();
    });
  });

  baseFilterBehavior.verifyFilter();

  it('should add headers', function () {
    resource.headers.should.exist;
  });

  it('should set expected headers', function() {
    var expected = createDict(
      HeaderConstants.CONTENT_TYPE, '',
      HeaderConstants.CONTENT_LENGTH, 0,
      HeaderConstants.STORAGE_VERSION_HEADER, expectedAPIVersion,
      HeaderConstants.DATE_HEADER, 'n/a',
      HeaderConstants.ACCEPT_HEADER, 'application/atom+xml,application/xml',
      HeaderConstants.ACCEPT_CHARSET_HEADER, 'UTF-8',
      HeaderConstants.HOST_HEADER, host + ':' + port);
    Object.keys(expected).forEach(function (header, i) {
      resource.headers.hasOwnProperty(header).should.be.true;
    });
  });
});
