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
var servicebustestutil = require('../../util/servicebus-test-utils');

var testPrefix = 'notificationhubs-tests';

var serviceBusService;

var hubNames;
var hubNamePrefix = 'hub';

describe('Notification hubs', function () {
  var service;

  before(function (done) {
    servicebustestutil.setUpTest(testPrefix, function (err, newServiceBusService) {
      serviceBusService = newServiceBusService;

      done();
    });
  });

  after(function (done) {
    // Schedule deleting notification hubs
    _.each(hubNames, function (notificationHub) {
      serviceBusService.deleteNotificationHub(notificationHub, function () {});
    });

    servicebustestutil.tearDownTest(serviceBusService, testPrefix, done);
  });

  describe('Create notification hub', function () {
    it('should create a notification hub', function (done) {
      var hubName = testutil.generateId(hubNamePrefix, hubNames);

      serviceBusService.createNotificationHub(hubName, function (err, hub) {
        should.not.exist(err);
        should.exist(hub);
        hub.NotificationHubName.should.equal(hubName);

        console.log(JSON.stringify(hub));

        done();
      });
    });
  });
});