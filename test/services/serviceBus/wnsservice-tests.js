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

var _ = require('underscore');

var should = require('should');

// Test includes
var testutil = require('../../util/util');
var notificationhubstestutil = require('../../framework/notificationhubs-test-utils');

var azure = testutil.libRequire('azure');

var hubNames = [];
var hubNamePrefix = 'xplathub';

var testPrefix = 'wnsservice-tests';

describe('WNS notifications', function () {
  var service;
  var suiteUtil;

  before(function (done) {
    service = azure.createNotificationHubService();
    suiteUtil = notificationhubstestutil.createNotificationHubsTestUtils(service, testPrefix);
    suiteUtil.setupSuite(done);
  });

  after(function (done) {
    suiteUtil.teardownSuite(done);
  });

  beforeEach(function (done) {
    suiteUtil.setupTest(function () {
      service.listNotificationHubs(function (err, hubs) {
        var xplatHubs = hubs.filter(function (hub) {
          return hub.NotificationHubName.substr(0, hubNamePrefix.length) === hubNamePrefix;
        });

        _.each(xplatHubs, function (hub) {
          service.deleteNotificationHub(hub.NotificationHubName, function () {});
        });

        done();
      });
    });
  });

  afterEach(function (done) {
    // Schedule deleting notification hubs
    _.each(hubNames, function (notificationHub) {
      service.deleteNotificationHub(notificationHub, function () {});
    });

    suiteUtil.baseTeardownTest(done);
  });

  describe('Send notification', function () {
    var hubName;

    beforeEach(function (done) {
      hubName = testutil.generateId(hubNamePrefix, hubNames, suiteUtil.isMocked);

      service.createNotificationHub(hubName, done);
    });

    it('should send a simple tile message', function (done) {
      service.wns.sendTileSquarePeekImageAndText01(
        hubName, {
          image1src: 'http://hi.com/dog.jpg',
          image1alt: 'A dog',
          text1: 'This is a dog',
          text2: 'The dog is nice',
          text3: 'The dog bites',
          text4: 'Beware of dog'
        },
        function (error, result) {
          should.not.exist(error);
          result.statusCode.should.equal(201);

          done();
        });
    });

    it('should send a simple raw message', function (done) {
      service.wns.send(hubName, 'wns/toast',
        '<tile><visual><binding template="TileSquarePeekImageAndText01">' +
        '<image id="1" src="http://foobar.com/dog.jpg" alt="A dog"/>' +
        '<text id="1">This is a dog</text>' +
        '<text id="2">The dog is nice</text>' +
        '<text id="3">The dog bites</text>' +
        '<text id="4">Beware of dog</text>' +
        '</binding></visual></tile>',
        function (error, result) {
        should.not.exist(error);
        result.statusCode.should.equal(201);

        done();
      });
    });
  });
});