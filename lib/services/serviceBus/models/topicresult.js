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
    'DefaultMessageTimeToLive',
    'MaximumNumberOfSubscriptions',
    'MaxSizeInMegabytes',
    'RequiresDuplicateDetection',
    'DeadLetteringOnFilterEvaluationExceptions',
    'DuplicateDetectionHistoryTimeWindow',
    'EnableBatchedOperations',
    'SizeInBytes'
  ];

  return resourceResult.serialize('TopicDescription', resource, properties);
};

exports.parse = function (xml) {
  var topic = resourceResult.parse('TopicDescription', xml);

  var pos = topic.id.lastIndexOf('/');
  topic.TopicName = topic.id.substr(pos + 1);

  if (topic.TopicName.indexOf('?') !== -1) {
    topic.TopicName = topic.TopicName.substr(0, topic.TopicName.indexOf('?'));
  }

  return topic;
};