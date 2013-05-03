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

/**
 * filter to convert a WebResource object into the options
 * format expected by the request library
 *
 * @param {WebResource} webResource the web resource to convert
 * @param {function} next next stage in the pipeline
 * @param {callback} callback to execute on request completion
 *
 * @return {object} the return value from next
 */
function webResourceToRequestOptionsFilter(webResource, next, callback) {
  var options = {};
  options.uri = webResource.path;
  options.method = webResource.httpVerb;
  options.qs = webResource.queryString;
  options.headers = webResource.headers;

  return next(options, callback);
}

module.exports = webResourceToRequestOptionsFilter;