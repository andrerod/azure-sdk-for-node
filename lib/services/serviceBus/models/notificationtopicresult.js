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

var queryString = require('querystring');
var _ = require('underscore');

// Module dependencies.
var AtomHandler = require('../../../util/atomhandler');
var ISO8061Date = require('../../../util/iso8061date');
var Constants = require('../../../util/constants');
var ServiceBusConstants = Constants.ServiceBusConstants;
var HeaderConstants = Constants.HeaderConstants;

// Expose 'NotificationHubResult'.
module.exports = NotificationHubResult;

function NotificationHubResult() { }

NotificationHubResult.serialize = function (options) {
  var notificationTopicDescription = {
    '$': {
      'xmlns:i': 'http://www.w3.org/2001/XMLSchema-instance',
      'xmlns': 'http://schemas.microsoft.com/netservices/2010/10/servicebus/connect'
    }
  };

  var atom = {
    'title': '',
    'updated': ISO8061Date.format(new Date()),
    'author': {
      name: ''
    },
    'id': '',
    'content': {
      '$': { type: 'application/xml' },
      NotificationTopicDescription: notificationTopicDescription
    }
  };

  var atomHandler = new AtomHandler(null, null);
  var xml = atomHandler.serialize(atom);
  return xml;
};

NotificationHubResult.parse = function (topicXml) {
  throw new Error('Not implemented');
};