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

var resourceResult = require('./resourceResult');

exports.serialize = function (resource) {
  var properties = [
    'LockDuration',
    'RequiresSession',
    'DefaultMessageTimeToLive',
    'DeadLetteringOnMessageExpiration',
    'DeadLetteringOnFilterEvaluationExceptions',
    'MessageCount',
    'MaxDeliveryCount',
    'EnableBatchedOperations'
  ];

  return resourceResult.serialize('SubscriptionDescription', resource, properties);
};

exports.parse = function (xml) {
  var subscription = resourceResult.parse('SubscriptionDescription', xml);

  // Extract subscription name
  var pos = subscription.id.lastIndexOf('/');
  subscription.SubscriptionName = subscription.id.substr(pos + 1);

  if (subscription.SubscriptionName.indexOf('?') !== -1) {
    subscription.SubscriptionName = subscription.SubscriptionName.substr(0, subscription.SubscriptionName.indexOf('?'));
  }

  // Extract string up to topic name
  pos = subscription.id.indexOf('/Subscriptions');
  var tmp = subscription.id.substr(0, pos);

  // Extract topic name
  pos = tmp.lastIndexOf('/');
  subscription.TopicName = tmp.substr(pos + 1);

  return subscription;
};