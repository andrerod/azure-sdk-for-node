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

var hubNames = [];
var hubNamePrefix = 'xplathub';

var testPrefix = 'wnsservice-tests';

describe('WNS notifications', function () {
  var service;
  var suiteUtil;
  var sandbox;
  var key = process.env.AZURE_SERVICEBUS_ACCESS_KEY;
  var connectionString = 'Endpoint=sb://nodejstest-0-0e8a1-1.servicebus.int7.windows-int.net/;StsEndpoint=https://nodejstest-0-0e8a1-1-sb.accesscontrol.aadint.windows-int.net/;SharedSecretIssuer=owner;SharedSecretValue=' + key;


  before(function (done) {
    sandbox = sinon.sandbox.create();

    service = azure.createServiceBusService(connectionString);
    suiteUtil = notificationhubstestutil.createNotificationHubsTestUtils(service, testPrefix);
    suiteUtil.setupSuite(done);
  });

  after(function (done) {
    sandbox.restore();
    suiteUtil.teardownSuite(done);
  });

  beforeEach(function (done) {
    suiteUtil.setupTest(function () {
      service.listNotificationHubs(function (err, hubs, rsp) {
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
/*
  describe('Send notification', function () {
    var hubName;
    var notificationHubService;

    beforeEach(function (done) {
      hubName = testutil.generateId(hubNamePrefix, hubNames, suiteUtil.isMocked);

      notificationHubService = azure.createNotificationHubService(hubName);
      suiteUtil.setupService(notificationHubService);
      service.createNotificationHub(hubName, done);
    });

    it('should send a simple tile message', function (done) {
      notificationHubService.wns.sendTileSquarePeekImageAndText01(
        null, {
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

    it('should send a simple tile message with tags', function (done) {
      var tagsString = 'dogs';

      var executeSpy = sandbox.spy(notificationHubService, '_executeRequest');
      notificationHubService.wns.sendTileSquarePeekImageAndText01(
        tagsString, {
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

          executeSpy.args[0][0].headers['ServiceBusNotification-Tags'].should.equal(tagsString);
          executeSpy.args[0][0].headers['X-WNS-Type'].should.equal('wns/tile');
          executeSpy.args[0][0].headers['ServiceBusNotification-Format'].should.equal('windows');

          done();
        });
    });

    it('should set wrong wns type if asked to (and fail to send)', function (done) {
      var tagsString = 'dogs';

      var executeSpy = sandbox.spy(notificationHubService, '_executeRequest');
      notificationHubService.wns.sendTileSquarePeekImageAndText01(
        tagsString, {
          image1src: 'http://hi.com/dog.jpg',
          image1alt: 'A dog',
          text1: 'This is a dog',
          text2: 'The dog is nice',
          text3: 'The dog bites',
          text4: 'Beware of dog'
        },
        {
          headers: {
            'X-WNS-Type': 'wns/raw'
          }
        },
        function (error, result) {
          should.exist(error);
          result.statusCode.should.equal(400);

          executeSpy.args[0][0].headers['ServiceBusNotification-Tags'].should.equal(tagsString);
          executeSpy.args[0][0].headers['X-WNS-Type'].should.equal('wns/raw');
          executeSpy.args[0][0].headers['ServiceBusNotification-Format'].should.equal('windows');

          done();
        });
    });

    it('should send a simple message', function (done) {
      notificationHubService.wns.send(null,
        '<tile><visual><binding template="TileSquarePeekImageAndText01">' +
        '<image id="1" src="http://hi.com/dog.jpg" alt="A dog"/>' +
        '<text id="1">This is a dog</text>' +
        '<text id="2">The dog is nice</text>' +
        '<text id="3">The dog bites</text>' +
        '<text id="4">Beware of dog</text>' +
        '</binding></visual></tile>',
        'wns/tile',
        function (error, result) {
          should.not.exist(error);
          result.statusCode.should.equal(201);

          done();
        }
      );
    });

    it('should send a badge message', function (done) {
      notificationHubService.wns.sendBadge(null, 'alert',
        function (error, result) {
          should.not.exist(error);
          result.statusCode.should.equal(201);

          done();
        }
      );
    });

    it('should send an attention badge message', function (done) {
      notificationHubService.wns.sendBadge(null, 'attention',
        function (error, result) {
          should.not.exist(error);
          result.statusCode.should.equal(201);

          done();
        }
      );
    });

    it('should send a numeric badge message', function (done) {
      notificationHubService.wns.sendBadge(null, 11,
        function (error, result) {
          should.not.exist(error);
          result.statusCode.should.equal(201);

          done();
        }
      );
    });

    it('should send a raw message', function (done) {
      notificationHubService.wns.sendRaw(null, JSON.stringify({ foo: 1, bar: 2 }),
        function (error, result) {
          should.not.exist(error);
          result.statusCode.should.equal(201);

          done();
        }
      );
    });
  });
*/
  describe('registrations', function () {
    var hubName;
    var notificationHubService;

    beforeEach(function (done) {
      hubName = testutil.generateId(hubNamePrefix, hubNames, suiteUtil.isMocked);

      notificationHubService = azure.createNotificationHubService(hubName, connectionString);
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
          notificationHubService.wns.createNativeRegistration('http://db3.notify.windows.com/fake/superfake', function (error, registration) {
            should.not.exist(error);
            registrationId = registration.RegistrationId;

            done();
          });
        });
      });

      describe('delete', function () {
        var registrationId;

        beforeEach(function (done) {
          notificationHubService.wns.createNativeRegistration('http://db3.notify.windows.com/fake/superfake', function (err, registration) {
            registrationId = registration.RegistrationId;

            done();
          });
        });

        it('should work', function (done) {
          notificationHubService.deleteRegistration(registrationId, function (err) {
            should.not.exist(err);

            done();
          });
        });
      });

      describe('get', function () {
        var registrationId;

        beforeEach(function (done) {
          notificationHubService.wns.createNativeRegistration('http://db3.notify.windows.com/fake/superfake', function (err, registration) {
            registrationId = registration.RegistrationId;

            done();
          });
        });

        it('should work', function (done) {
          notificationHubService.getRegistration(registrationId, function (err, registration) {
            should.not.exist(err);
            should.exist(registration);
            registration['ExpirationTime'].should.not.be.null;
            registration['ETag'].should.not.be.null;

            done();
          });
        });
      });

      describe('list', function () {
        var registrationId;

        beforeEach(function (done) {
          notificationHubService.wns.createNativeRegistration('http://db3.notify.windows.com/fake/superfake', function (err, registration) {
            registrationId = registration.RegistrationId;

            done();
          });
        });

        it('should work without filtering', function (done) {
          notificationHubService.listRegistrations(function (err, list) {
            should.not.exist(err);
            should.exist(list);
            list.length.should.equal(1);

            done();
          });
        });

        it('should work with tag filtering', function (done) {
          notificationHubService.listRegistrationsByTag(function (err, list) {
            done();
          });
        });
      });
    });
  });
});