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

var Constants = require('../../../util/constants');
var resourceResult = require('./resourceResult');

exports.serialize = function (resource) {
  var properties = [
    'WnsCredential',
    'ApnsCredential'
  ];

  return resourceResult.serialize('NotificationHubDescription', resource, properties);
};

exports.parse = function (xml) {
  var result = resourceResult.parse('NotificationHubDescription', xml);

  if (_.isArray(result)) {
    _.each(result, function (entry) {
      setName(entry);
    })
  } else {
    setName(result);
  }

  return result;
};

function setName(entry) {
  var pos = entry[Constants.ATOM_METADATA_MARKER].id.lastIndexOf('/');
  entry.NotificationHubName = entry[Constants.ATOM_METADATA_MARKER].id.substr(pos + 1);

  if (entry.NotificationHubName.indexOf('?') !== -1) {
    entry.NotificationHubName = entry.NotificationHubName.substr(0, entry.NotificationHubName.indexOf('?'));
  }
}