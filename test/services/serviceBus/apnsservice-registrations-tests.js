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
var sinon = require('sinon');

// Test includes
var testutil = require('../../util/util');
var notificationhubstestutil = require('../../framework/notificationhubs-test-utils');

var azure = testutil.libRequire('azure');

var HeaderConstants = azure.Constants.HeaderConstants;

var tokenId = '0f744707bebcf74f9b7c25d48e3358945f6aa01da5ddb387462c7eaf61bbad78';

var hubNames = [];
var hubNamePrefix = 'xplathubnxt';

var testPrefix = 'apnsservice-registrations-tests';

describe('APNS notifications registrations', function () {
  var service;
  var suiteUtil;
  var sandbox;

  var key = process.env.AZURE_SERVICEBUS_ACCESS_KEY_TEST;
  var connectionString = 'Endpoint=sb://nodejstest-0-0e8a1-1.servicebus.int7.windows-int.net/;StsEndpoint=https://nodejstest-0-0e8a1-1-sb.accesscontrol.aadint.windows-int.net/;SharedSecretIssuer=owner;SharedSecretValue=' + key;

  before(function (done) {
    sandbox = sinon.sandbox.create();

    service = azure.createServiceBusService(connectionString);
    service.apiVersion = '2013-04';
    suiteUtil = notificationhubstestutil.createNotificationHubsTestUtils(service, testPrefix);
    suiteUtil.setupSuite(done);
  });

  after(function (done) {
    sandbox.restore();
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

  describe('registrations', function () {
    var hubName;
    var notificationHubService;

    beforeEach(function (done) {
      hubName = testutil.generateId(hubNamePrefix, hubNames, suiteUtil.isMocked);

      notificationHubService = azure.createNotificationHubService(hubName, connectionString);
      notificationHubService.apiVersion = '2013-04';

      suiteUtil.setupService(notificationHubService);
      service.createNotificationHub(hubName, done);
    });

    describe('native', function () {
      describe('create', function () {
        var registrationId;

        afterEach(function (done) {
          notificationHubService.deleteRegistration(registrationId, done);
        });

        it('should work', function (done) {
          notificationHubService.apns.createNativeRegistration(tokenId, function (error, registration) {
            should.not.exist(error);
            registrationId = registration.RegistrationId;

            done();
          });
        });
      });
    });

    describe('template', function () {
      describe('create alert', function () {
        var registrationId;

        afterEach(function (done) {
          notificationHubService.deleteRegistration(registrationId, done);
        });

        it('should work', function (done) {
          notificationHubService.apns.createTemplateRegistration(
            tokenId,
            {
              alert: '$(alertMessage1)'
            },
            function (error, registration) {
              should.not.exist(error);
              registrationId = registration.RegistrationId;

              done();
          });
        });
      });

      describe('update alert', function () {
        var registrationId;

        beforeEach(function (done) {
          notificationHubService.apns.createTemplateRegistration(
            tokenId,
            {
              alert: '$(alertMessage1)'
            },
            function (error, registration) {
              should.not.exist(error);
              registrationId = registration.RegistrationId;

              done();
          });
        });

        afterEach(function (done) {
          notificationHubService.deleteRegistration(registrationId, done);
        });

        it('should work', function (done) {
          notificationHubService.apns.updateTemplateRegistration(
            registrationId,
            tokenId,
            {
              alert: '$(newAlertMessage1)'
            },
            function (error) {
              should.not.exist(error);

              done();
          });
        });
      });
    });
  });
});