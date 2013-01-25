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

var SqlServerDatabaseService = require('../../../lib/services/serviceManagement/sqlserverdatabaseservice');

var testutil = require('../../util/util');

var azure = testutil.libRequire('azure');

var SERVER_ADMIN_USERNAME = 'azuresdk';
var SERVER_ADMIN_PASSWORD = 'PassWord!1';
var SERVER_LOCATION = 'West US';

describe('SQL Azure Database', function () {
  var service;

  before(function () {
    service = new SqlServerDatabaseService('irx8d7g0th', 'andrerod', 'AzureRocks!12');
  });

  describe('list SQL databases', function () {

    it('should list databasess', function (done) {
      service.listServerDatabases(function (err, databases) {
        console.log(databases);

        // cshould.exist(sqlServers);
        // sqlServers.should.be.empty;
        done(err);
      });
    });


    /*
    describe('No defined databases', function () {
      before(function (done) {
        service.listServers(function (err, sqlServers) {
          deleteSqlServers(sqlServers.map(function (s) { return s.Name; }), done);
        });
      });

      it('should return empty list of databases', function (done) {
        service.listServers(function (err, sqlServers) {
          should.exist(sqlServers);
          sqlServers.should.be.empty;
          done(err);
        });
      });
    });

    describe('when one database is defined', function () {
      before(function (done) {
        service.listServers(function (err, sqlServers) {
          deleteSqlServers(sqlServers.map(function (s) { return s.Name; }), function () {
            service.createServer(SERVER_ADMIN_USERNAME, SERVER_ADMIN_PASSWORD, SERVER_LOCATION, done);
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