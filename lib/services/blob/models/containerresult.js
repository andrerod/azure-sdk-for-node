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

// Module dependencies.
var Constants = require('../../../util/constants');
var HeaderConstants = Constants.HeaderConstants;
var BlobConstants = Constants.BlobConstants;

function setPropertiesFromHeaders (container, headers) {
  var setContainerPropertyFromHeaders = function (containerProperty, headerProperty) {
    if (!container[containerProperty] && headers[headerProperty.toLowerCase()]) {
      container[containerProperty] = headers[headerProperty.toLowerCase()];
    }
  };

  setContainerPropertyFromHeaders('etag', HeaderConstants.ETAG);
  setContainerPropertyFromHeaders('lastModified', Constants.LAST_MODIFIED_ELEMENT);

  if (!container.publicAccessLevel) {
    container.publicAccessLevel = BlobConstants.BlobContainerPublicAccessType.OFF;
    if (headers[HeaderConstants.BLOB_PUBLIC_ACCESS_HEADER]) {
      container.publicAccessLevel = headers[HeaderConstants.BLOB_PUBLIC_ACCESS_HEADER];
    }
  }

  if (container.publicAccessLevel === 'true') {
    // The container was marked for full public read access using a version prior to 2009-09-19.
    container.publicAccessLevel = BlobConstants.BlobContainerPublicAccessType.CONTAINER;
  }
}

/**
* Retrieves the metadata headers from the response headers.
*
* @param {object} headers The metadata headers.
* @return {object} An object with the metadata headers (without the "x-ms-" prefix).
*/
function setMetadataFromHeaders (container, headers) {
  container.metadata = {};

  if (!headers) {
    return;
  }

  for (var header in headers) {
    if (header.indexOf(HeaderConstants.PREFIX_FOR_STORAGE_METADATA) === 0) {
      var key = header.substr(HeaderConstants.PREFIX_FOR_STORAGE_METADATA.length, header.length - HeaderConstants.PREFIX_FOR_STORAGE_METADATA.length);
      container.metadata[key] = headers[header];
    }
  }
}

exports.parse = function (response) {
  var containerXml = response.body;

  var containerResult = { };

  for (var propertyName in containerXml) {
    if (containerXml.hasOwnProperty(propertyName)) {
      if (propertyName === 'Properties' || propertyName === 'Metadata') {
        containerResult[propertyName.toLowerCase()] = { };
        for (var subPropertyName in containerXml[propertyName]) {
          if (containerXml[propertyName].hasOwnProperty(subPropertyName)) {
            containerResult[propertyName.toLowerCase()][subPropertyName.toLowerCase()] = containerXml[propertyName][subPropertyName];
          }
        }
      } else {
        containerResult[propertyName.toLowerCase()] = containerXml[propertyName];
      }
    }
  }

  if (response.headers) {
    setMetadataFromHeaders(containerResult, response.headers);
    setPropertiesFromHeaders(containerResult, response.headers);
  }

  return [ containerResult ];
};