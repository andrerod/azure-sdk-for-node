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
var xmlbuilder = require('xmlbuilder');

var js2xml = require('./js2xml');
var ISO8061Date = require('./iso8061date');
var Constants = require('./constants');

exports = module.exports;

exports.parse = function (xml, contentTopTag) {
  console.log(xml);

  throw new Error("Unrecognized result " + JSON.stringify(xml));
};

exports.serializeFeed = function (contents) {
  throw new Error('Not yet implemented');
};

/**
* @param {object} content     The content payload as it is to be serialized by js2xml.
* @param {array}  namespaces  An array of top level namespaces to be defined.
*/
exports.serializeEntry = function (content, namespaces) {
  var doc = xmlbuilder.create();

  doc = doc.begin('entry', { version: '1.0', encoding: 'utf-8', standalone: 'yes' })
    .att('xmlns', 'http://www.w3.org/2005/Atom');

  _.each(namespaces, function (namespace) {
    doc = doc.att('xmlns:' + namespace.key, namespace.url);
  });

  doc = doc
    .ele('updated', ISO8061Date.format(new Date()))
    .up();

  var atomContent = {};
  atomContent[Constants.XML_METADATA_MARKER] = { 'type': 'application/xml' }
  atomContent[Constants.XML_VALUE_MARKER] = content;

  console.log(atomContent);

  doc = js2xml._writeElementValue(doc, 'content', atomContent);

  return doc.doc().toString();
};