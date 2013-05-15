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
var sinon = require('sinon');

// Test includes
var testutil = require('../../util/util');
var tabletestutil = require('../../framework/table-test-utils');

// Lib includes
var azure = testutil.libRequire('azure');

var ServiceClient = azure.ServiceClient;
var LinearRetryPolicyFilter = azure.LinearRetryPolicyFilter;
var Constants = azure.Constants;

var tableService;
var linearRetryPolicyFilter;

var tableNames = [];
var tablePrefix = 'linearretry';

var testPrefix = 'linearretrypolicyfilter-tests';

var tableService;
var suiteUtil;

suite('linearretrypolicyfilter-tests', function () {
  suiteSetup(function (done) {
    linearRetryPolicyFilter = new LinearRetryPolicyFilter();
    tableService = azure.createTableService().withFilter(linearRetryPolicyFilter);
    suiteUtil = tabletestutil.createTableTestUtils(tableService, testPrefix);
    suiteUtil.setupSuite(done);
  });

  suiteTeardown(function (done) {
    suiteUtil.teardownSuite(done);
  });

  setup(function (done) {
    suiteUtil.setupTest(done);
  });

  teardown(function (done) {
    suiteUtil.teardownTest(done);
  });

  test('RetryFailSingle', function (done) {
    var tableName = testutil.generateId(tablePrefix, tableNames, suiteUtil.isMocked);

    var retryCount = 3;
    var retryInterval = 30;

    linearRetryPolicyFilter.retryCount = retryCount;
    linearRetryPolicyFilter.retryInterval = retryInterval;

    tableService.createTable(tableName, function (err) {
      assert.equal(err, null);

      tableService.createTable(tableName, function (err2) {
        assert.notEqual(err2, null);
        assert.equal(err2.code, Constants.TableErrorCodeStrings.TABLE_ALREADY_EXISTS);
        assert.equal(err2.innerError, null);

        done();
      });
    });
  });

  test('RetryFailMultiple', function (done) {
    var tableName = testutil.generateId(tablePrefix, tableNames, suiteUtil.isMocked);

    var retryCount = 3;

    // 30 seconds between attempts should be enough to give enough time for the
    // table creation to succeed after a deletion.
    var retryInterval = 30000;

    if (suiteUtil.isMocked && !suiteUtil.isRecording) {
      // if a playback on the mockserver is running, retryinterval can be lower
      retryInterval = 30;
    }

    linearRetryPolicyFilter.retryCount = retryCount;
    linearRetryPolicyFilter.retryInterval = retryInterval;

    // replace shouldRetry to skip return codes verification and retry on 409 (deleting)
    linearRetryPolicyFilter.shouldRetry = function (statusCode, retryData) {
      var currentCount = (retryData && retryData.retryCount) ? retryData.retryCount : 0;

      return (currentCount < this.retryCount);
    };

    tableService.createTable(tableName, function (err) {
      assert.equal(err, null);

      tableService.deleteTable(tableName, function (err2) {
        assert.equal(err2, null);

        // trying to create a table right after a delete should force retry to kick in
        // table should be created nicely
        tableService.createTable(tableName, function (err3) {
          assert.equal(err3, null);

          done();
        });
      });
    });
  });

  test('RetryPassOnGetTable', function (done) {
    var tableName = testutil.generateId(tablePrefix, tableNames, suiteUtil.isMocked);

    var retryCount = 3;
    var retryInterval = 30;

    linearRetryPolicyFilter.retryCount = retryCount;
    linearRetryPolicyFilter.retryInterval = retryInterval;

    tableService.getTable(tableName, function (err, table) {
      assert.equal(err.code, Constants.StorageErrorCodeStrings.RESOURCE_NOT_FOUND);
      assert.equal(table, null);

      done();
    });
  });
});

suite('linearretrypolicyfilter-newfilter-tests', function () {
  function sinkReturning(err, code) {
    return sinon.spy(function (options, callback) {
      callback(err, 'result', { statusCode: code}, null);
    });
  }

  test('no retry on success', function (done) {
    var filter = new LinearRetryPolicyFilter();
    var next = sinkReturning(null, Constants.HttpConstants.HttpResponseCodes.Ok);

    filter({uri: 'doesntMatter'}, next, function (err, result, response, body) {
      assert.equal(1, next.callCount);
      done();
    });
  });

  test('retries on failure until count', function (done) {
    var filter = new LinearRetryPolicyFilter(3, 5);
    var next = sinkReturning(new Error('failed'), 500);

    filter({uri: 'doesntMatter'}, next, function (err, result, response, body) {
      assert.equal(filter.retryCount, next.callCount);
      assert.notEqual(null, err);
      done();
    });
  });

  test('fail then succeeds', function (done) {
    var filter = new LinearRetryPolicyFilter(3, 5);
    var count = 0;
    var next = sinon.spy(function (options, callback) {
      ++count;
      if (count < 2) {
        callback(new Error('failed'), 500, { statusCode: 500}, null);
      } else {
        callback(null, 200, { statusCode: 200 }, null);
      }
    });

    filter(null, next, function (err, result, response, body) {
      assert.equal(2, next.callCount);
      assert.equal(200, response.statusCode);
      done();
    });
  });
});
