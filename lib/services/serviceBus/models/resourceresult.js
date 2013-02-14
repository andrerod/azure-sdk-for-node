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

var atomHandler = require('../../../util/atomhandler');

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

  var content = {};
  content[resourceName] = resourceDescription;

  var atomPub = atomHandler.serializeEntry(content);
  console.log(atomPub);
  return atomPub;
};

exports.parse = function (resourceName, nameProperty, xml) {
  var result = atomHandler.parse(xml, resourceName);

  if (_.isArray(result)) {
    _.each(result, function (entry) {
      setName(entry, nameProperty);
    })
  } else {
    setName(result, nameProperty);
  }

  return result;
};

function setName(entry, nameProperty) {
  var pos = entry[Constants.ATOM_METADATA_MARKER].id.lastIndexOf('/');
  entry[nameProperty] = entry[Constants.ATOM_METADATA_MARKER].id.substr(pos + 1);

  if (entry[nameProperty].indexOf('?') !== -1) {
    entry[nameProperty] = entry[nameProperty].substr(0, entry[nameProperty].indexOf('?'));
  }
}