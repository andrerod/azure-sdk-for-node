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

'use strict';

var xml2js = require('xml2js');

function xmlParserFilter(xml2jsSettings) {
  return function (resource, next, callback) {
    return next(resource, function (err, result, response, body) {
      if (err) { return callback(err, null, response, body); }

      var parser = new xml2js.Parser(xml2jsSettings);
      var parseError = null;
      parser.on('error', function (e) { parseError = e; });
      parser.parseString(body);

      if (parser.resultObject) {
        callback(null, parser.resultObject, response, body);
      } else {
        callback(parseError, null, response, body);
      }
    });
  };
}

module.exports = xmlParserFilter;