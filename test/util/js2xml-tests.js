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

// Test includes
var testutil = require('./util');

// Lib includes
var js2xml = testutil.libRequire('util/js2xml');

describe('js2xml', function() {
  describe('createElement', function () {
    it('should work', function (done) {
      var name = 'name';
      var namespace = 'namespace';

      var element = js2xml.createElement(name, namespace);
      element.name.should.equal(name);
      element.namespace.should.equal(namespace);
      should.not.exist(element.value);

      done();
    });
  });

  describe('setElementValue', function () {
    it('should work', function (done) {
      var name = 'name';
      var namespace = 'namespace';
      var value = 'newvalue';

      var element = js2xml.createElement(name, namespace);
      should.not.exist(element.value);

      js2xml.setElementValue(element, value);
      element.value.should.equal(value);

      done();
    });
  });

  describe('addChildElement', function () {
    it('should work', function (done) {
      var name1 = 'name1';
      var name2 = 'name2';
      var namespace1 = 'namespace1';
      var namespace2 = 'namespace2';

      var element1 = js2xml.createElement(name1, namespace1);
      var element2 = js2xml.createElement(name2, namespace2);

      element1.children.length.should.equal(0);

      js2xml.addChildElement(element1, element2);

      element1.children.length.should.equal(1);
      element1.children[0].name.should.equal(name2);

      done();
    });
  });
});