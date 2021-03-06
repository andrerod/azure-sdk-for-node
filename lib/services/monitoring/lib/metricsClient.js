/* jshint latedef:false */
/* jshint forin:false */
/* jshint noempty:false */

// 
// Copyright (c) Microsoft and contributors.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// 
// See the License for the specific language governing permissions and
// limitations under the License.
// 

// Warning: This code was generated by a tool.
// 
// Changes to this file may cause incorrect behavior and will be lost if the
// code is regenerated.

'use strict';

var util = require('util');
var moment = require('moment');
var azureCommon = require('azure-common');
var Service = azureCommon.Service;
var WebResource = azureCommon.WebResource;

var MetricsClient = ( /** @lends MetricsClient */ function() {
  /**
   * @class
   * Initializes a new instance of the MetricsClient class.
   * @constructor
   * 
   * @param {SubscriptionCloudCredentials} credentials Gets subscription
   * credentials which uniquely identify Microsoft Azure subscription. The
   * subscription ID forms part of the URI for every service call.
   * 
   * @param {string} [credentials.subscriptionId]
   * 
   * @param {string} [baseUri] Gets the URI used as the base for all cloud
   * service requests.
   * 
   * @param {Array} filters
   */
  function MetricsClient(credentials, baseUri, filters) {
    if (credentials === null || credentials === undefined) {
      throw new Error('credentials cannot be null.');
    }
    
    MetricsClient['super_'].call(this, credentials, filters);
    
    this.credentials = credentials;
    this.baseUri = baseUri;
    if (this.baseUri === null || this.baseUri === undefined) {
      this.baseUri = 'https://management.core.windows.net';
    }
    if (this.apiVersion === null || this.apiVersion === undefined) {
      this.apiVersion = '2013-10-01';
    }
    if (this.longRunningOperationInitialTimeout === null || this.longRunningOperationInitialTimeout === undefined) {
      this.longRunningOperationInitialTimeout = -1;
    }
    if (this.longRunningOperationRetryTimeout === null || this.longRunningOperationRetryTimeout === undefined) {
      this.longRunningOperationRetryTimeout = -1;
    }
    /**
     * Provides an instance of the
     * [MetricDefinitionOperations](-MetricDefinitionOperations.html) object.
     * @type {object}
     */
    this.metricDefinitions = new MetricDefinitionOperations(this);
    /**
     * Provides an instance of the
     * [MetricSettingOperations](-MetricSettingOperations.html) object.
     * @type {object}
     */
    this.metricSettings = new MetricSettingOperations(this);
    /**
     * Provides an instance of the
     * [MetricValueOperations](-MetricValueOperations.html) object.
     * @type {object}
     */
    this.metricValues = new MetricValueOperations(this);
  }
  
  util.inherits(MetricsClient, Service);
  
  
  return MetricsClient;
})();
exports.MetricsClient = MetricsClient;

var MetricDefinitionOperations = ( /** @lends MetricDefinitionOperations */ function() {
  /**
   * @class
   * __NOTE__: An instance of this class is automatically created for an
   * instance of the [MetricsClient] {@link MetricsClient~MetricsClient}.
   * See [metricDefinitions] {@link
   * MetricsClient~MetricsClient#metricDefinitions}.
   * Initializes a new instance of the MetricDefinitionOperations class.
   * @constructor
   * 
   * @param {MetricsClient} client Reference to the service client.
   */
  function MetricDefinitionOperations(client) {
    this.client = client;
  }
  
  /**
   * The List Metric Definitions operation lists the metric definitions for the
   * resource.
   * 
   * @param {string} resourceId The id of the resource.The resource id can be
   * built using the resource id builder class under utilities
   * 
   * @param {Array} [metricNames] The names of the metrics.
   * 
   * @param {string} [metricNamespace] The namespace of the metrics.The value
   * is either null or WindowsAzure.Availability.WindowsAzure.Availability
   * returns the metric definitions for endpoint monitoring metrics
   * 
   * @param {function} callback
   * 
   * @returns {Stream} The response stream.
   */
  MetricDefinitionOperations.prototype.list = function(resourceId, metricNames, metricNamespace, callback) {
    if (callback === null || callback === undefined) {
      throw new Error('callback cannot be null.');
    }
    // Validate
    if (resourceId === null || resourceId === undefined) {
      return callback(new Error('resourceId cannot be null.'));
    }
    
    // Tracing
    
    // Construct URL
    var url2 = '/' + (this.client.credentials.subscriptionId !== null && this.client.credentials.subscriptionId !== undefined ? this.client.credentials.subscriptionId.trim() : '') + '/services/monitoring/metricdefinitions/query?';
    url2 = url2 + '&resourceId=' + encodeURIComponent(resourceId.trim());
    if (metricNamespace !== null && metricNamespace !== undefined) {
      url2 = url2 + '&namespace=' + encodeURIComponent(metricNamespace !== null && metricNamespace !== undefined ? metricNamespace.trim() : '');
    }
    if (metricNames !== null && metricNames !== undefined && metricNames.length > 0) {
      url2 = url2 + '&names=' + encodeURIComponent(metricNames.join(','));
    }
    var baseUrl = this.client.baseUri;
    // Trim '/' character from the end of baseUrl and beginning of url.
    if (baseUrl[baseUrl.length - 1] === '/') {
      baseUrl = baseUrl.substring(0, (baseUrl.length - 1) + 0);
    }
    if (url2[0] === '/') {
      url2 = url2.substring(1);
    }
    url2 = baseUrl + '/' + url2;
    url2 = url2.replace(' ', '%20');
    
    // Create HTTP transport objects
    var httpRequest = new WebResource();
    httpRequest.method = 'GET';
    httpRequest.headers = {};
    httpRequest.url = url2;
    
    // Set Headers
    httpRequest.headers['Accept'] = 'application/json';
    httpRequest.headers['x-ms-version'] = '2013-10-01';
    
    // Send Request
    return this.client.pipeline(httpRequest, function (err, response, body) {
      if (err !== null && err !== undefined) {
        return callback(err);
      }
      var statusCode = response.statusCode;
      if (statusCode !== 200) {
        var error = new Error(body);
        error.statusCode = response.statusCode;
        return callback(error);
      }
      
      // Create Result
      var result = null;
      // Deserialize Response
      var responseContent = body;
      result = {};
      var responseDoc = null;
      if (responseContent) {
        responseDoc = JSON.parse(responseContent);
      }
      
      if (responseDoc !== null && responseDoc !== undefined) {
        var metricDefinitionCollectionInstance = { value: [] };
        result.metricDefinitionCollection = metricDefinitionCollectionInstance;
        
        var valueArray = responseDoc['Value'];
        if (valueArray !== null && valueArray !== undefined) {
          for (var loweredIndex1 = 0; loweredIndex1 < valueArray.length; loweredIndex1 = loweredIndex1 + 1) {
            var valueValue = valueArray[loweredIndex1];
            var metricDefinitionInstance = { metricAvailabilities: [] };
            metricDefinitionCollectionInstance.value.push(metricDefinitionInstance);
            
            var nameValue = valueValue['Name'];
            if (nameValue !== null && nameValue !== undefined) {
              var nameInstance = nameValue;
              metricDefinitionInstance.name = nameInstance;
            }
            
            var namespaceValue = valueValue['Namespace'];
            if (namespaceValue !== null && namespaceValue !== undefined) {
              var namespaceInstance = namespaceValue;
              metricDefinitionInstance.namespace = namespaceInstance;
            }
            
            var resourceIdSuffixValue = valueValue['ResourceIdSuffix'];
            if (resourceIdSuffixValue !== null && resourceIdSuffixValue !== undefined) {
              var resourceIdSuffixInstance = resourceIdSuffixValue;
              metricDefinitionInstance.resourceIdSuffix = resourceIdSuffixInstance;
            }
            
            var displayNameValue = valueValue['DisplayName'];
            if (displayNameValue !== null && displayNameValue !== undefined) {
              var displayNameInstance = displayNameValue;
              metricDefinitionInstance.displayName = displayNameInstance;
            }
            
            var unitValue = valueValue['Unit'];
            if (unitValue !== null && unitValue !== undefined) {
              var unitInstance = unitValue;
              metricDefinitionInstance.unit = unitInstance;
            }
            
            var primaryAggregationValue = valueValue['PrimaryAggregation'];
            if (primaryAggregationValue !== null && primaryAggregationValue !== undefined) {
              var primaryAggregationInstance = primaryAggregationValue;
              metricDefinitionInstance.primaryAggregation = primaryAggregationInstance;
            }
            
            var metricAvailabilitiesArray = valueValue['MetricAvailabilities'];
            if (metricAvailabilitiesArray !== null && metricAvailabilitiesArray !== undefined) {
              for (var loweredIndex2 = 0; loweredIndex2 < metricAvailabilitiesArray.length; loweredIndex2 = loweredIndex2 + 1) {
                var metricAvailabilitiesValue = metricAvailabilitiesArray[loweredIndex2];
                var metricAvailabilityInstance = {};
                metricDefinitionInstance.metricAvailabilities.push(metricAvailabilityInstance);
                
                var timeGrainValue = metricAvailabilitiesValue['TimeGrain'];
                if (timeGrainValue !== null && timeGrainValue !== undefined) {
                  var timeGrainInstance = moment.duration(timeGrainValue);
                  metricAvailabilityInstance.timeGrain = timeGrainInstance;
                }
                
                var retentionValue = metricAvailabilitiesValue['Retention'];
                if (retentionValue !== null && retentionValue !== undefined) {
                  var retentionInstance = moment.duration(retentionValue);
                  metricAvailabilityInstance.retention = retentionInstance;
                }
              }
            }
            
            var minimumAlertableTimeWindowValue = valueValue['MinimumAlertableTimeWindow'];
            if (minimumAlertableTimeWindowValue !== null && minimumAlertableTimeWindowValue !== undefined) {
              var minimumAlertableTimeWindowInstance = moment.duration(minimumAlertableTimeWindowValue);
              metricDefinitionInstance.minimumAlertableTimeWindow = minimumAlertableTimeWindowInstance;
            }
            
            var isAlertableValue = valueValue['IsAlertable'];
            if (isAlertableValue !== null && isAlertableValue !== undefined) {
              var isAlertableInstance = isAlertableValue;
              metricDefinitionInstance.isAlertable = isAlertableInstance;
            }
          }
        }
      }
      
      result.statusCode = statusCode;
      result.requestId = response.headers['x-ms-request-id'];
      
      return callback(null, result);
    });
  };
  
  return MetricDefinitionOperations;
})();

var MetricSettingOperations = ( /** @lends MetricSettingOperations */ function() {
  /**
   * @class
   * __NOTE__: An instance of this class is automatically created for an
   * instance of the [MetricsClient] {@link MetricsClient~MetricsClient}.
   * See [metricSettings] {@link MetricsClient~MetricsClient#metricSettings}.
   * Initializes a new instance of the MetricSettingOperations class.
   * @constructor
   * 
   * @param {MetricsClient} client Reference to the service client.
   */
  function MetricSettingOperations(client) {
    this.client = client;
  }
  
  /**
   * The Put Metric Settings operation creates or updates the metric settings
   * for the resource.
   * 
   * @param {MetricSettingsPutParameters} parameters Metric settings to be
   * created or updated.
   * 
   * @param {MetricSetting} parameters.metricSetting The metric setting.
   * 
   * @param {string} parameters.metricSetting.resourceId The resource id of the
   * service.
   * 
   * @param {string} [parameters.metricSetting.namespace] The metric settings
   * namespace. For endpoint monitoring metrics the namespace value is
   * WindowsAzure.Availability
   * 
   * @param {MetricSettingValue} parameters.metricSetting.value The metric
   * settings value.
   * 
   * @param {function} callback
   * 
   * @returns {Stream} The response stream.
   */
  MetricSettingOperations.prototype.createOrUpdate = function(parameters, callback) {
    if (callback === null || callback === undefined) {
      throw new Error('callback cannot be null.');
    }
    // Validate
    if (parameters === null || parameters === undefined) {
      return callback(new Error('parameters cannot be null.'));
    }
    if (parameters.metricSetting === null || parameters.metricSetting === undefined) {
      return callback(new Error('parameters.metricSetting cannot be null.'));
    }
    if (parameters.metricSetting.resourceId === null || parameters.metricSetting.resourceId === undefined) {
      return callback(new Error('parameters.metricSetting.resourceId cannot be null.'));
    }
    if (parameters.metricSetting.value === null || parameters.metricSetting.value === undefined) {
      return callback(new Error('parameters.metricSetting.value cannot be null.'));
    }
    
    // Tracing
    
    // Construct URL
    var url2 = '/' + (this.client.credentials.subscriptionId !== null && this.client.credentials.subscriptionId !== undefined ? this.client.credentials.subscriptionId.trim() : '') + '/services/monitoring/metricsettings';
    var baseUrl = this.client.baseUri;
    // Trim '/' character from the end of baseUrl and beginning of url.
    if (baseUrl[baseUrl.length - 1] === '/') {
      baseUrl = baseUrl.substring(0, (baseUrl.length - 1) + 0);
    }
    if (url2[0] === '/') {
      url2 = url2.substring(1);
    }
    url2 = baseUrl + '/' + url2;
    url2 = url2.replace(' ', '%20');
    
    // Create HTTP transport objects
    var httpRequest = new WebResource();
    httpRequest.method = 'PUT';
    httpRequest.headers = {};
    httpRequest.url = url2;
    
    // Set Headers
    httpRequest.headers['Accept'] = 'application/json';
    httpRequest.headers['Content-Type'] = 'application/json; charset=utf-8';
    httpRequest.headers['x-ms-version'] = '2013-10-01';
    
    // Serialize Request
    var requestContent = null;
    var requestDoc = null;
    
    requestDoc = {};
    requestDoc['ResourceId'] = parameters.metricSetting.resourceId;
    
    if (parameters.metricSetting.namespace !== null && parameters.metricSetting.namespace !== undefined) {
      requestDoc['Namespace'] = parameters.metricSetting.namespace;
    }
    
    var valueValue = {};
    requestDoc['Value'] = valueValue;
    if (parameters.metricSetting.value.type === 'Microsoft.WindowsAzure.Management.Monitoring.Metrics.Models.AvailabilityMetricSettingValue') {
      valueValue['odata.type'] = parameters.metricSetting.value.type;
      var derived = parameters.metricSetting.value;
      
      if (derived.availableLocations !== null && derived.availableLocations !== undefined) {
        var availableLocationsArray = [];
        for (var loweredIndex1 = 0; loweredIndex1 < derived.availableLocations.length; loweredIndex1 = loweredIndex1 + 1) {
          var availableLocationsItem = derived.availableLocations[loweredIndex1];
          var nameConfigValue = {};
          availableLocationsArray.push(nameConfigValue);
          
          if (availableLocationsItem.name !== null && availableLocationsItem.name !== undefined) {
            nameConfigValue['Name'] = availableLocationsItem.name;
          }
          
          if (availableLocationsItem.displayName !== null && availableLocationsItem.displayName !== undefined) {
            nameConfigValue['DisplayName'] = availableLocationsItem.displayName;
          }
        }
        valueValue['AvailableLocations'] = availableLocationsArray;
      }
      
      if (derived.endpoints !== null && derived.endpoints !== undefined) {
        var endpointsArray = [];
        for (var loweredIndex2 = 0; loweredIndex2 < derived.endpoints.length; loweredIndex2 = loweredIndex2 + 1) {
          var endpointsItem = derived.endpoints[loweredIndex2];
          var endpointConfigValue = {};
          endpointsArray.push(endpointConfigValue);
          
          if (endpointsItem.configId !== null && endpointsItem.configId !== undefined) {
            endpointConfigValue['ConfigId'] = endpointsItem.configId;
          }
          
          if (endpointsItem.name !== null && endpointsItem.name !== undefined) {
            endpointConfigValue['Name'] = endpointsItem.name;
          }
          
          if (endpointsItem.location !== null && endpointsItem.location !== undefined) {
            endpointConfigValue['Location'] = endpointsItem.location;
          }
          
          if (endpointsItem.url !== null && endpointsItem.url !== undefined) {
            endpointConfigValue['Url'] = endpointsItem.url;
          }
        }
        valueValue['Endpoints'] = endpointsArray;
      }
    }
    
    requestContent = JSON.stringify(requestDoc);
    httpRequest.body = requestContent;
    httpRequest.headers['Content-Length'] = Buffer.isBuffer(requestContent) ? requestContent.length : Buffer.byteLength(requestContent, 'UTF8');
    // Send Request
    return this.client.pipeline(httpRequest, function (err, response, body) {
      if (err !== null && err !== undefined) {
        return callback(err);
      }
      var statusCode = response.statusCode;
      if (statusCode !== 200) {
        var error = new Error(body);
        error.statusCode = response.statusCode;
        return callback(error);
      }
      
      // Create Result
      var result = null;
      // Deserialize Response
      var responseContent = body;
      result = {};
      var responseDoc = null;
      if (responseContent) {
        responseDoc = JSON.parse(responseContent);
      }
      
      if (responseDoc !== null && responseDoc !== undefined) {
      }
      
      result.statusCode = statusCode;
      result.requestId = response.headers['x-ms-request-id'];
      
      return callback(null, result);
    });
  };
  
  /**
   * The List Metric Settings operation lists the metric settings for the
   * resource.
   * 
   * @param {string} resourceId The id of the resource.
   * 
   * @param {string} metricNamespace The namespace of the metrics.
   * 
   * @param {function} callback
   * 
   * @returns {Stream} The response stream.
   */
  MetricSettingOperations.prototype.list = function(resourceId, metricNamespace, callback) {
    if (callback === null || callback === undefined) {
      throw new Error('callback cannot be null.');
    }
    // Validate
    if (resourceId === null || resourceId === undefined) {
      return callback(new Error('resourceId cannot be null.'));
    }
    if (metricNamespace === null || metricNamespace === undefined) {
      return callback(new Error('metricNamespace cannot be null.'));
    }
    
    // Tracing
    
    // Construct URL
    var url2 = '/' + (this.client.credentials.subscriptionId !== null && this.client.credentials.subscriptionId !== undefined ? this.client.credentials.subscriptionId.trim() : '') + '/services/monitoring/metricsettings?';
    url2 = url2 + '&resourceId=' + encodeURIComponent(resourceId.trim());
    url2 = url2 + '&namespace=' + encodeURIComponent(metricNamespace.trim());
    var baseUrl = this.client.baseUri;
    // Trim '/' character from the end of baseUrl and beginning of url.
    if (baseUrl[baseUrl.length - 1] === '/') {
      baseUrl = baseUrl.substring(0, (baseUrl.length - 1) + 0);
    }
    if (url2[0] === '/') {
      url2 = url2.substring(1);
    }
    url2 = baseUrl + '/' + url2;
    url2 = url2.replace(' ', '%20');
    
    // Create HTTP transport objects
    var httpRequest = new WebResource();
    httpRequest.method = 'GET';
    httpRequest.headers = {};
    httpRequest.url = url2;
    
    // Set Headers
    httpRequest.headers['Accept'] = 'application/json';
    httpRequest.headers['x-ms-version'] = '2013-10-01';
    
    // Send Request
    return this.client.pipeline(httpRequest, function (err, response, body) {
      if (err !== null && err !== undefined) {
        return callback(err);
      }
      var statusCode = response.statusCode;
      if (statusCode !== 200) {
        var error = new Error(body);
        error.statusCode = response.statusCode;
        return callback(error);
      }
      
      // Create Result
      var result = null;
      // Deserialize Response
      var responseContent = body;
      result = {};
      var responseDoc = null;
      if (responseContent) {
        responseDoc = JSON.parse(responseContent);
      }
      
      if (responseDoc !== null && responseDoc !== undefined) {
        var metricSettingCollectionInstance = { value: [] };
        result.metricSettingCollection = metricSettingCollectionInstance;
        
        var valueArray = responseDoc['Value'];
        if (valueArray !== null && valueArray !== undefined) {
          for (var loweredIndex1 = 0; loweredIndex1 < valueArray.length; loweredIndex1 = loweredIndex1 + 1) {
            var valueValue = valueArray[loweredIndex1];
            var metricSettingInstance = {};
            metricSettingCollectionInstance.value.push(metricSettingInstance);
            
            var resourceIdValue = valueValue['ResourceId'];
            if (resourceIdValue !== null && resourceIdValue !== undefined) {
              var resourceIdInstance = resourceIdValue;
              metricSettingInstance.resourceId = resourceIdInstance;
            }
            
            var namespaceValue = valueValue['Namespace'];
            if (namespaceValue !== null && namespaceValue !== undefined) {
              var namespaceInstance = namespaceValue;
              metricSettingInstance.namespace = namespaceInstance;
            }
            
            var valueValue2 = valueValue['Value'];
            if (valueValue2 !== null && valueValue2 !== undefined) {
              var typeName = valueValue2['odata.type'];
              if (typeName === 'Microsoft.WindowsAzure.Management.Monitoring.Metrics.Models.AvailabilityMetricSettingValue') {
                var availabilityMetricSettingValueInstance = { availableLocations: [], endpoints: [] };
                
                var availableLocationsArray = valueValue2['AvailableLocations'];
                if (availableLocationsArray !== null && availableLocationsArray !== undefined) {
                  for (var loweredIndex2 = 0; loweredIndex2 < availableLocationsArray.length; loweredIndex2 = loweredIndex2 + 1) {
                    var availableLocationsValue = availableLocationsArray[loweredIndex2];
                    var nameConfigInstance = {};
                    availabilityMetricSettingValueInstance.availableLocations.push(nameConfigInstance);
                    
                    var nameValue = availableLocationsValue['Name'];
                    if (nameValue !== null && nameValue !== undefined) {
                      var nameInstance = nameValue;
                      nameConfigInstance.name = nameInstance;
                    }
                    
                    var displayNameValue = availableLocationsValue['DisplayName'];
                    if (displayNameValue !== null && displayNameValue !== undefined) {
                      var displayNameInstance = displayNameValue;
                      nameConfigInstance.displayName = displayNameInstance;
                    }
                  }
                }
                
                var endpointsArray = valueValue2['Endpoints'];
                if (endpointsArray !== null && endpointsArray !== undefined) {
                  for (var loweredIndex3 = 0; loweredIndex3 < endpointsArray.length; loweredIndex3 = loweredIndex3 + 1) {
                    var endpointsValue = endpointsArray[loweredIndex3];
                    var endpointConfigInstance = {};
                    availabilityMetricSettingValueInstance.endpoints.push(endpointConfigInstance);
                    
                    var configIdValue = endpointsValue['ConfigId'];
                    if (configIdValue !== null && configIdValue !== undefined) {
                      var configIdInstance = configIdValue;
                      endpointConfigInstance.configId = configIdInstance;
                    }
                    
                    var nameValue2 = endpointsValue['Name'];
                    if (nameValue2 !== null && nameValue2 !== undefined) {
                      var nameInstance2 = nameValue2;
                      endpointConfigInstance.name = nameInstance2;
                    }
                    
                    var locationValue = endpointsValue['Location'];
                    if (locationValue !== null && locationValue !== undefined) {
                      var locationInstance = locationValue;
                      endpointConfigInstance.location = locationInstance;
                    }
                    
                    var urlValue = endpointsValue['Url'];
                    if (urlValue !== null && urlValue !== undefined) {
                      var urlInstance = urlValue;
                      endpointConfigInstance.url = urlInstance;
                    }
                  }
                }
                metricSettingInstance.value = availabilityMetricSettingValueInstance;
              }
            }
          }
        }
      }
      
      result.statusCode = statusCode;
      result.requestId = response.headers['x-ms-request-id'];
      
      return callback(null, result);
    });
  };
  
  return MetricSettingOperations;
})();

var MetricValueOperations = ( /** @lends MetricValueOperations */ function() {
  /**
   * @class
   * __NOTE__: An instance of this class is automatically created for an
   * instance of the [MetricsClient] {@link MetricsClient~MetricsClient}.
   * See [metricValues] {@link MetricsClient~MetricsClient#metricValues}.
   * Initializes a new instance of the MetricValueOperations class.
   * @constructor
   * 
   * @param {MetricsClient} client Reference to the service client.
   */
  function MetricValueOperations(client) {
    this.client = client;
  }
  
  /**
   * The List Metric Value operation lists the metric value sets for the
   * resource metrics.
   * 
   * @param {string} resourceId The id of the resource.
   * 
   * @param {Array} metricNames The names of the metrics.
   * 
   * @param {string} [metricNamespace] The namespace of the metrics.
   * 
   * @param {TimeSpan} timeGrain The time grain of the metrics.
   * 
   * @param {Date} startTime The start time (in UTC) of the metrics.
   * 
   * @param {Date} endTime The end time (in UTC) of the metrics.
   * 
   * @param {function} callback
   * 
   * @returns {Stream} The response stream.
   */
  MetricValueOperations.prototype.list = function(resourceId, metricNames, metricNamespace, timeGrain, startTime, endTime, callback) {
    if (callback === null || callback === undefined) {
      throw new Error('callback cannot be null.');
    }
    // Validate
    if (resourceId === null || resourceId === undefined) {
      return callback(new Error('resourceId cannot be null.'));
    }
    if (metricNames === null || metricNames === undefined) {
      return callback(new Error('metricNames cannot be null.'));
    }
    if (metricNames.length <= 0) {
      return callback(new Error('metricNames cannot be empty.'));
    }
    if (timeGrain === null || timeGrain === undefined) {
      return callback(new Error('timeGrain cannot be null.'));
    }
    if (startTime === null || startTime === undefined) {
      return callback(new Error('startTime cannot be null.'));
    }
    if (endTime === null || endTime === undefined) {
      return callback(new Error('endTime cannot be null.'));
    }
    
    // Tracing
    
    // Construct URL
    var url2 = '/' + (this.client.credentials.subscriptionId !== null && this.client.credentials.subscriptionId !== undefined ? this.client.credentials.subscriptionId.trim() : '') + '/services/monitoring/metricvalues/query?';
    url2 = url2 + '&resourceId=' + encodeURIComponent(resourceId.trim());
    if (metricNamespace !== null && metricNamespace !== undefined) {
      url2 = url2 + '&namespace=' + encodeURIComponent(metricNamespace !== null && metricNamespace !== undefined ? metricNamespace.trim() : '');
    }
    url2 = url2 + '&names=' + encodeURIComponent(metricNames.join(','));
    url2 = url2 + '&timeGrain=' + encodeURIComponent(timeGrain.toIsoString());
    url2 = url2 + '&startTime=' + encodeURIComponent(startTime.toISOString());
    url2 = url2 + '&endTime=' + encodeURIComponent(endTime.toISOString());
    var baseUrl = this.client.baseUri;
    // Trim '/' character from the end of baseUrl and beginning of url.
    if (baseUrl[baseUrl.length - 1] === '/') {
      baseUrl = baseUrl.substring(0, (baseUrl.length - 1) + 0);
    }
    if (url2[0] === '/') {
      url2 = url2.substring(1);
    }
    url2 = baseUrl + '/' + url2;
    url2 = url2.replace(' ', '%20');
    
    // Create HTTP transport objects
    var httpRequest = new WebResource();
    httpRequest.method = 'GET';
    httpRequest.headers = {};
    httpRequest.url = url2;
    
    // Set Headers
    httpRequest.headers['Accept'] = 'application/json';
    httpRequest.headers['x-ms-version'] = '2013-10-01';
    
    // Send Request
    return this.client.pipeline(httpRequest, function (err, response, body) {
      if (err !== null && err !== undefined) {
        return callback(err);
      }
      var statusCode = response.statusCode;
      if (statusCode !== 200) {
        var error = new Error(body);
        error.statusCode = response.statusCode;
        return callback(error);
      }
      
      // Create Result
      var result = null;
      // Deserialize Response
      var responseContent = body;
      result = {};
      var responseDoc = null;
      if (responseContent) {
        responseDoc = JSON.parse(responseContent);
      }
      
      if (responseDoc !== null && responseDoc !== undefined) {
        var metricValueSetCollectionInstance = { value: [] };
        result.metricValueSetCollection = metricValueSetCollectionInstance;
        
        var valueArray = responseDoc['Value'];
        if (valueArray !== null && valueArray !== undefined) {
          for (var loweredIndex1 = 0; loweredIndex1 < valueArray.length; loweredIndex1 = loweredIndex1 + 1) {
            var valueValue = valueArray[loweredIndex1];
            var metricValueSetInstance = { metricValues: [] };
            metricValueSetCollectionInstance.value.push(metricValueSetInstance);
            
            var nameValue = valueValue['Name'];
            if (nameValue !== null && nameValue !== undefined) {
              var nameInstance = nameValue;
              metricValueSetInstance.name = nameInstance;
            }
            
            var namespaceValue = valueValue['Namespace'];
            if (namespaceValue !== null && namespaceValue !== undefined) {
              var namespaceInstance = namespaceValue;
              metricValueSetInstance.namespace = namespaceInstance;
            }
            
            var displayNameValue = valueValue['DisplayName'];
            if (displayNameValue !== null && displayNameValue !== undefined) {
              var displayNameInstance = displayNameValue;
              metricValueSetInstance.displayName = displayNameInstance;
            }
            
            var unitValue = valueValue['Unit'];
            if (unitValue !== null && unitValue !== undefined) {
              var unitInstance = unitValue;
              metricValueSetInstance.unit = unitInstance;
            }
            
            var primaryAggregationValue = valueValue['PrimaryAggregation'];
            if (primaryAggregationValue !== null && primaryAggregationValue !== undefined) {
              var primaryAggregationInstance = primaryAggregationValue;
              metricValueSetInstance.primaryAggregation = primaryAggregationInstance;
            }
            
            var timeGrainValue = valueValue['TimeGrain'];
            if (timeGrainValue !== null && timeGrainValue !== undefined) {
              var timeGrainInstance = moment.duration(timeGrainValue);
              metricValueSetInstance.timeGrain = timeGrainInstance;
            }
            
            var startTimeValue = valueValue['StartTime'];
            if (startTimeValue !== null && startTimeValue !== undefined) {
              var startTimeInstance = startTimeValue;
              metricValueSetInstance.startTime = startTimeInstance;
            }
            
            var endTimeValue = valueValue['EndTime'];
            if (endTimeValue !== null && endTimeValue !== undefined) {
              var endTimeInstance = endTimeValue;
              metricValueSetInstance.endTime = endTimeInstance;
            }
            
            var metricValuesArray = valueValue['MetricValues'];
            if (metricValuesArray !== null && metricValuesArray !== undefined) {
              for (var loweredIndex2 = 0; loweredIndex2 < metricValuesArray.length; loweredIndex2 = loweredIndex2 + 1) {
                var metricValuesValue = metricValuesArray[loweredIndex2];
                var metricValueInstance = {};
                metricValueSetInstance.metricValues.push(metricValueInstance);
                
                var timestampValue = metricValuesValue['Timestamp'];
                if (timestampValue !== null && timestampValue !== undefined) {
                  var timestampInstance = timestampValue;
                  metricValueInstance.timestamp = timestampInstance;
                }
                
                var averageValue = metricValuesValue['Average'];
                if (averageValue !== null && averageValue !== undefined) {
                  var averageInstance = averageValue;
                  metricValueInstance.average = averageInstance;
                }
                
                var minimumValue = metricValuesValue['Minimum'];
                if (minimumValue !== null && minimumValue !== undefined) {
                  var minimumInstance = minimumValue;
                  metricValueInstance.minimum = minimumInstance;
                }
                
                var maximumValue = metricValuesValue['Maximum'];
                if (maximumValue !== null && maximumValue !== undefined) {
                  var maximumInstance = maximumValue;
                  metricValueInstance.maximum = maximumInstance;
                }
                
                var totalValue = metricValuesValue['Total'];
                if (totalValue !== null && totalValue !== undefined) {
                  var totalInstance = totalValue;
                  metricValueInstance.total = totalInstance;
                }
                
                var annotationValue = metricValuesValue['Annotation'];
                if (annotationValue !== null && annotationValue !== undefined) {
                  var annotationInstance = annotationValue;
                  metricValueInstance.annotation = annotationInstance;
                }
                
                var countValue = metricValuesValue['Count'];
                if (countValue !== null && countValue !== undefined) {
                  var countInstance = countValue;
                  metricValueInstance.count = countInstance;
                }
              }
            }
          }
        }
      }
      
      result.statusCode = statusCode;
      result.requestId = response.headers['x-ms-request-id'];
      
      return callback(null, result);
    });
  };
  
  return MetricValueOperations;
})();
