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

var should = require('should');
var mocha = require('mocha');
var uuid = require('node-uuid');

var testutil = require('../../util/util');

var azure = testutil.libRequire('azure');

var SERVER_ADMIN_USERNAME = 'azuresdk';
var SERVER_ADMIN_PASSWORD = 'PassWord!1';
var SERVER_LOCATION = 'West US';


describe('SQL Azure Database', function () {
  var serverName;

  var service;
  var serviceManagement;

  before(function (done) {
    var subscriptionId = process.env['AZURE_SUBSCRIPTION_ID'];
    var auth = { keyvalue: process.env['AZURE_CERTIFICATE_KEY'], certvalue: process.env['AZURE_CERTIFICATE'] };
    serviceManagement = azure.createSqlManagementService(
      subscriptionId, auth,
      { serializetype: 'XML'});

    serviceManagement.createServer(SERVER_ADMIN_USERNAME, SERVER_ADMIN_PASSWORD, SERVER_LOCATION, function (err, name) {
      serverName = name;

      // Create the SQL Azure service to test
      service = azure.createSqlService(serverName, SERVER_ADMIN_USERNAME, SERVER_ADMIN_PASSWORD);

      // find out which ip address to add to the firewall rule by trying to access the server
      service.listServerDatabases(function (err) {
        var ipAddress = err.match(/Client with IP address '/);
        console.log(ipAddress);

        // add firewall rule
        serviceManagement.createServerFirewallRule(serverName, 'rule1', ipAddress, ipAddress, function () {

          done();
        });
      });
    });
  });

  after(function (done) {
    serviceManagement.deleteServer(serverName, done);
  });

  describe('list SQL databases', function () {
    describe('No defined databases', function () {
      service.listServerDatabases(function (err, databases) {
        should.exist(sqlServers);
        sqlServers.should.be.empty;
        done(err);
      });
    });

/*
    describe('when one database is defined', function () {
      before(function (done) {
        service.listServerDatabases(function (err, databases) {

          // TODO: figure this out
          deleteServerDatabases(databases.map(function (d) { return d.Name; }), function () {
            service.createServerDatabase(SERVER_ADMIN_USERNAME, SERVER_ADMIN_PASSWORD, SERVER_LOCATION, done);
          });
        });
      });

      it('should return one database in the list', function (done) {
        service.listServers(function (err, sqlServers) {
          should.exist(sqlServers);
          sqlServers.should.have.length(1);
          sqlServers[0].Location.should.equal(SERVER_LOCATION);
          done(err);
        });
      });
    });
*/
  });
});