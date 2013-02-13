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

// Module dependencies.
var AtomHandler = require('../../../util/atomhandler');
var ISO8061Date = require('../../../util/iso8061date');

exports = module.exports;

exports.serialize = function (resourceName, resource, properties) {
  var resourceDescription = {
    '$': {
      'xmlns:i': 'http://www.w3.org/2001/XMLSchema-instance',
      'xmlns': 'http://schemas.microsoft.com/netservices/2010/10/servicebus/connect'
    }
  };

  if (resource) {
    _.each(properties, function (property) {
      if (!_.isUndefined(resource[property])) {
        resourceDescription[property] = resource[property];
      }
    });
  }

  var atom = {
    'title': '',
    'updated': ISO8061Date.format(new Date()),
    'author': {
      name: ''
    },
    'id': '',
    'content': {
      '$': { type: 'application/xml' }
    }
  };

  atom['content'][resourceName] = resourceDescription;

  var atomHandler = new AtomHandler(null, null);
  return atomHandler.serialize(atom);
};

exports.parse = function (resourceName, xml) {
  var atomHandler = new AtomHandler(null, null);
  var resource = atomHandler.parse(xml, resourceName);
  return resource;
};