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

      should.not.exist(element1.value);

      js2xml.addChildElement(element1, element2);

      element1.value.length.should.equal(1);
      element1.value[0].name.should.equal(name2);

      done();
    });
  });

  describe('serializeDocument', function () {
    it('should work with a child', function (done) {
      var name1 = 'name1';
      var name2 = 'name2';
      var namespace1 = 'namespace1';
      var namespace2 = 'namespace2';
      var value2 = 3;

      var element1 = js2xml.createElement(name1, namespace1);
      var element2 = js2xml.createElement(name2, namespace2);
      js2xml.setElementValue(element2, value2);
      js2xml.addChildElement(element1, element2);

      var result = js2xml.serializeDocument(element1);

      result.should.equal('<?xml version="1.0" encoding="utf-8" standalone="yes"?><name1><name2>' + value2 + '</name2></name1>');

      done();
    });

    it('should work with a child and attriutes', function (done) {
      var name1 = 'name1';
      var name2 = 'name2';
      var namespace1 = 'namespace1';
      var namespace2 = 'namespace2';
      var value2 = 3;
      var attrName1 = 'attrName1';
      var attrName2a = 'attrName2a';
      var attrName2b = 'attrName2b';
      var attrValue1 = 'attrValue1';
      var attrValue2a = 'attrValue2a';
      var attrValue2b = 'attrValue2b';

      var element1 = js2xml.createElement(name1, namespace1);
      var attr1 = js2xml.createAttribute(attrName1);
      js2xml.setAttributeValue(attr1, attrValue1);
      js2xml.addAttribute(element1, attr1);

      var element2 = js2xml.createElement(name2, namespace2);
      js2xml.setElementValue(element2, value2);

      var attr2a = js2xml.createAttribute(attrName2a);
      js2xml.setAttributeValue(attr2a, attrValue2a);
      js2xml.addAttribute(element2, attr2a);

      var attr2b = js2xml.createAttribute(attrName2b);
      js2xml.setAttributeValue(attr2b, attrValue2b);
      js2xml.addAttribute(element2, attr2b);

      js2xml.addChildElement(element1, element2);

      var result = js2xml.serializeDocument(element1);

      result.should.equal('<?xml version="1.0" encoding="utf-8" standalone="yes"?><name1 ' +
        attrName1 + '="' + attrValue1 + '">' +
        '<name2 ' + attrName2a + '="' + attrValue2a + '" ' + attrName2b + '="' + attrValue2b + '">' +
        value2 + '</name2></name1>');

      done();
    });
  });
});