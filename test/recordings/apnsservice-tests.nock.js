// This file has been autogenerated.

exports.scopes = [[function (nock) { 
var result = 
nock('https://ciserversb-sb.accesscontrol.windows.net:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/WRAPv0.9/', '*')
  .reply(200, "wrap_access_token=net.windows.servicebus.action%3dListen%252cManage%252cSend%26http%253a%252f%252fschemas.microsoft.com%252faccesscontrolservice%252f2010%252f07%252fclaims%252fidentityprovider%3dhttps%253a%252f%252fciserversb-sb.accesscontrol.windows.net%252f%26Audience%3dhttp%253a%252f%252fciserversb.servicebus.windows.net%252f%2524Resources%252fNotificationHubs%26ExpiresOn%3d1363313919%26Issuer%3dhttps%253a%252f%252fciserversb-sb.accesscontrol.windows.net%252f%26HMACSHA256%3dzg2Q0t4lJW%252b8EN9UiqIeOdEQTkVNMf%252f1jUMbd09YNZA%253d&wrap_access_token_expires_in=1199", { 'cache-control': 'no-cache, no-store',
  pragma: 'no-cache',
  'content-type': 'application/x-www-form-urlencoded; charset=us-ascii',
  expires: '-1',
  'request-id': '2bd5a3d0-26d5-4524-b703-849a5770d6d5',
  'x-content-type-options': 'nosniff',
  date: 'Fri, 15 Mar 2013 01:58:38 GMT',
  'content-length': '572' });
 return result; },
function (nock) { 
var result = 
nock('https://ciserversb.servicebus.windows.net:443')
  .get('/$Resources/NotificationHubs?api-version=2012-08')
  .reply(200, "<feed xmlns=\"http://www.w3.org/2005/Atom\"><title type=\"text\">NotificationHubs</title><id>https://ciserversb.servicebus.windows.net/$Resources/NotificationHubs?api-version=2012-08</id><updated>2013-03-15T01:58:40Z</updated><link rel=\"self\" href=\"https://ciserversb.servicebus.windows.net/$Resources/NotificationHubs?api-version=2012-08\"/><entry xml:base=\"https://ciserversb.servicebus.windows.net/$Resources/NotificationHubs?api-version=2012-08\"><id>https://ciserversb.servicebus.windows.net/myhub?api-version=2012-08</id><title type=\"text\">myhub</title><published>2013-02-23T00:22:23Z</published><updated>2013-02-28T14:27:57Z</updated><author><name>ciserversb</name></author><link rel=\"self\" href=\"../myhub?api-version=2012-08\"/><content type=\"application/xml\"><NotificationHubDescription xmlns=\"http://schemas.microsoft.com/netservices/2010/10/servicebus/connect\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\"><RegistrationTtl>P90D</RegistrationTtl><WnsCredential><Properties><Property><Name>PackageSid</Name><Value>ms-app://s-1-15-2-3624382523-3073449496-1584155076-733487050-1832530571-3873708642-3859416007</Value></Property><Property><Name>SecretKey</Name><Value>Blz9qc7m94s6lM0nO7xwybMY0bDLy+aa</Value></Property><Property><Name>WindowsLiveEndpoint</Name><Value>https://login.live.com/accesstoken.srf</Value></Property></Properties></WnsCredential><AuthorizationRules><AuthorizationRule i:type=\"SharedAccessAuthorizationRule\"><ClaimType>SharedAccessKey</ClaimType><ClaimValue>None</ClaimValue><Rights><AccessRights>Listen</AccessRights></Rights><KeyName>DefaultListenSharedAccessSignature</KeyName><PrimaryKey>cVV3cmNZOCkkdXktXl8qbQ==</PrimaryKey></AuthorizationRule><AuthorizationRule i:type=\"SharedAccessAuthorizationRule\"><ClaimType>SharedAccessKey</ClaimType><ClaimValue>None</ClaimValue><Rights><AccessRights>Listen</AccessRights><AccessRights>Manage</AccessRights><AccessRights>Send</AccessRights></Rights><KeyName>DefaultFullSharedAccessSignature</KeyName><PrimaryKey>Kj5FUlB4UmM1KXAybD1RPQ==</PrimaryKey></AuthorizationRule></AuthorizationRules></NotificationHubDescription></content></entry><entry xml:base=\"https://ciserversb.servicebus.windows.net/$Resources/NotificationHubs?api-version=2012-08\"><id>https://ciserversb.servicebus.windows.net/xplathub2?api-version=2012-08</id><title type=\"text\">xplathub2</title><published>2013-03-15T01:32:19Z</published><updated>2013-03-15T01:32:19Z</updated><author><name>ciserversb</name></author><link rel=\"self\" href=\"../xplathub2?api-version=2012-08\"/><content type=\"application/xml\"><NotificationHubDescription xmlns=\"http://schemas.microsoft.com/netservices/2010/10/servicebus/connect\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\"><RegistrationTtl>P90D</RegistrationTtl><AuthorizationRules><AuthorizationRule i:type=\"SharedAccessAuthorizationRule\"><ClaimType>SharedAccessKey</ClaimType><ClaimValue>None</ClaimValue><Rights><AccessRights>Listen</AccessRights></Rights><CreatedTime>2013-03-15T01:32:19.3485826Z</CreatedTime><ModifiedTime>2013-03-15T01:32:19.3485826Z</ModifiedTime><KeyName>DefaultListenSharedAccessSignature</KeyName><PrimaryKey>cUA7R0pDJnBtOlIme2ooOg==</PrimaryKey></AuthorizationRule><AuthorizationRule i:type=\"SharedAccessAuthorizationRule\"><ClaimType>SharedAccessKey</ClaimType><ClaimValue>None</ClaimValue><Rights><AccessRights>Listen</AccessRights><AccessRights>Manage</AccessRights><AccessRights>Send</AccessRights></Rights><CreatedTime>2013-03-15T01:32:19.3485826Z</CreatedTime><ModifiedTime>2013-03-15T01:32:19.3485826Z</ModifiedTime><KeyName>DefaultFullSharedAccessSignature</KeyName><PrimaryKey>Wm5YSGNVYlZhJildQV53bg==</PrimaryKey></AuthorizationRule></AuthorizationRules></NotificationHubDescription></content></entry></feed>", { 'transfer-encoding': 'chunked',
  'content-type': 'application/atom+xml;type=feed;charset=utf-8',
  server: 'Microsoft-HTTPAPI/2.0',
  date: 'Fri, 15 Mar 2013 01:58:40 GMT' });
 return result; },
function (nock) { 
var result = 
nock('https://ciserversb-sb.accesscontrol.windows.net:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/WRAPv0.9/', '*')
  .reply(200, "wrap_access_token=net.windows.servicebus.action%3dListen%252cManage%252cSend%26http%253a%252f%252fschemas.microsoft.com%252faccesscontrolservice%252f2010%252f07%252fclaims%252fidentityprovider%3dhttps%253a%252f%252fciserversb-sb.accesscontrol.windows.net%252f%26Audience%3dhttp%253a%252f%252fciserversb.servicebus.windows.net%252fxplathub2%26ExpiresOn%3d1363313921%26Issuer%3dhttps%253a%252f%252fciserversb-sb.accesscontrol.windows.net%252f%26HMACSHA256%3dfJkPC1bpDAGgo8g7VxmaZx96OetVUD4zlKbXz9w4K4I%253d&wrap_access_token_expires_in=1199", { 'cache-control': 'no-cache, no-store',
  pragma: 'no-cache',
  'content-type': 'application/x-www-form-urlencoded; charset=us-ascii',
  expires: '-1',
  'request-id': '29a5fa97-dca7-4624-8d00-2c5cf02c21ce',
  'x-content-type-options': 'nosniff',
  date: 'Fri, 15 Mar 2013 01:58:41 GMT',
  'content-length': '538' });
 return result; },
function (nock) { 
var result = 
nock('https://ciserversb-sb.accesscontrol.windows.net:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/WRAPv0.9/', '*')
  .reply(200, "wrap_access_token=net.windows.servicebus.action%3dListen%252cManage%252cSend%26http%253a%252f%252fschemas.microsoft.com%252faccesscontrolservice%252f2010%252f07%252fclaims%252fidentityprovider%3dhttps%253a%252f%252fciserversb-sb.accesscontrol.windows.net%252f%26Audience%3dhttp%253a%252f%252fciserversb.servicebus.windows.net%252fxplathub1%26ExpiresOn%3d1363313921%26Issuer%3dhttps%253a%252f%252fciserversb-sb.accesscontrol.windows.net%252f%26HMACSHA256%3dDhDA8xDHsbhRoe6nhmfKULuxO1hCUnVVDWIPvsCkN54%253d&wrap_access_token_expires_in=1199", { 'cache-control': 'no-cache, no-store',
  pragma: 'no-cache',
  'content-type': 'application/x-www-form-urlencoded; charset=us-ascii',
  expires: '-1',
  'request-id': '3b3acdf2-9998-47ab-912f-4a38202a4843',
  'x-content-type-options': 'nosniff',
  date: 'Fri, 15 Mar 2013 01:58:41 GMT',
  'content-length': '538' });
 return result; },
function (nock) { 
var result = 
nock('https://ciserversb.servicebus.windows.net:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/xplathub1?api-version=2012-08', '*')
  .reply(201, "<entry xmlns=\"http://www.w3.org/2005/Atom\"><id>https://ciserversb.servicebus.windows.net/xplathub1?api-version=2012-08</id><title type=\"text\">xplathub1</title><published>2013-03-15T01:58:43Z</published><updated>2013-03-15T01:58:43Z</updated><author><name>ciserversb</name></author><link rel=\"self\" href=\"https://ciserversb.servicebus.windows.net/xplathub1?api-version=2012-08\"/><content type=\"application/xml\"><NotificationHubDescription xmlns=\"http://schemas.microsoft.com/netservices/2010/10/servicebus/connect\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\"><RegistrationTtl>P90D</RegistrationTtl><AuthorizationRules><AuthorizationRule i:type=\"SharedAccessAuthorizationRule\"><ClaimType>SharedAccessKey</ClaimType><ClaimValue>None</ClaimValue><Rights><AccessRights>Listen</AccessRights></Rights><CreatedTime>2013-03-15T01:58:43.3395248Z</CreatedTime><ModifiedTime>2013-03-15T01:58:43.3395248Z</ModifiedTime><KeyName>DefaultListenSharedAccessSignature</KeyName><PrimaryKey>NjVreGoyW1tMJUZ9djc4eQ==</PrimaryKey></AuthorizationRule><AuthorizationRule i:type=\"SharedAccessAuthorizationRule\"><ClaimType>SharedAccessKey</ClaimType><ClaimValue>None</ClaimValue><Rights><AccessRights>Listen</AccessRights><AccessRights>Manage</AccessRights><AccessRights>Send</AccessRights></Rights><CreatedTime>2013-03-15T01:58:43.3707746Z</CreatedTime><ModifiedTime>2013-03-15T01:58:43.3707746Z</ModifiedTime><KeyName>DefaultFullSharedAccessSignature</KeyName><PrimaryKey>TiRpNSU+bWx7bk1KV3hlKg==</PrimaryKey></AuthorizationRule></AuthorizationRules></NotificationHubDescription></content></entry>", { 'transfer-encoding': 'chunked',
  'content-type': 'application/atom+xml;type=entry;charset=utf-8',
  server: 'Microsoft-HTTPAPI/2.0',
  date: 'Fri, 15 Mar 2013 01:58:43 GMT' });
 return result; },
function (nock) { 
var result = 
nock('https://ciserversb.servicebus.windows.net:443')
  .delete('/xplathub2?api-version=2012-08')
  .reply(200, "", { 'content-length': '0',
  server: 'Microsoft-HTTPAPI/2.0',
  date: 'Fri, 15 Mar 2013 01:58:43 GMT' });
 return result; },
function (nock) { 
var result = 
nock('https://ciserversb-sb.accesscontrol.windows.net:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/WRAPv0.9/', '*')
  .reply(200, "wrap_access_token=net.windows.servicebus.action%3dListen%252cManage%252cSend%26http%253a%252f%252fschemas.microsoft.com%252faccesscontrolservice%252f2010%252f07%252fclaims%252fidentityprovider%3dhttps%253a%252f%252fciserversb-sb.accesscontrol.windows.net%252f%26Audience%3dhttp%253a%252f%252fciserversb.servicebus.windows.net%252fxplathub1%252fMessages%26ExpiresOn%3d1363313925%26Issuer%3dhttps%253a%252f%252fciserversb-sb.accesscontrol.windows.net%252f%26HMACSHA256%3dg5c1zUv%252fORZz2%252ft9xPv%252feUw6eQJBV5ClK1aekm%252boCfA%253d&wrap_access_token_expires_in=1199", { 'cache-control': 'no-cache, no-store',
  pragma: 'no-cache',
  'content-type': 'application/x-www-form-urlencoded; charset=us-ascii',
  expires: '-1',
  'request-id': '38bc8fc0-1a70-4a54-b40f-7ce93fd0271e',
  'x-content-type-options': 'nosniff',
  date: 'Fri, 15 Mar 2013 01:58:44 GMT',
  'content-length': '567' });
 return result; },
function (nock) { 
var result = 
nock('https://ciserversb.servicebus.windows.net:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/xplathub1/Messages?api-version=2012-08', '*')
  .reply(201, "", { 'transfer-encoding': 'chunked',
  'content-type': 'application/xml; charset=utf-8',
  server: 'Microsoft-HTTPAPI/2.0',
  date: 'Fri, 15 Mar 2013 01:58:45 GMT' });
 return result; }],
[function (nock) { 
var result = 
nock('https://ciserversb.servicebus.windows.net:443')
  .get('/$Resources/NotificationHubs?api-version=2012-08')
  .reply(200, "<feed xmlns=\"http://www.w3.org/2005/Atom\"><title type=\"text\">NotificationHubs</title><id>https://ciserversb.servicebus.windows.net/$Resources/NotificationHubs?api-version=2012-08</id><updated>2013-03-15T01:58:47Z</updated><link rel=\"self\" href=\"https://ciserversb.servicebus.windows.net/$Resources/NotificationHubs?api-version=2012-08\"/><entry xml:base=\"https://ciserversb.servicebus.windows.net/$Resources/NotificationHubs?api-version=2012-08\"><id>https://ciserversb.servicebus.windows.net/myhub?api-version=2012-08</id><title type=\"text\">myhub</title><published>2013-02-23T00:22:23Z</published><updated>2013-02-28T14:27:57Z</updated><author><name>ciserversb</name></author><link rel=\"self\" href=\"../myhub?api-version=2012-08\"/><content type=\"application/xml\"><NotificationHubDescription xmlns=\"http://schemas.microsoft.com/netservices/2010/10/servicebus/connect\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\"><RegistrationTtl>P90D</RegistrationTtl><WnsCredential><Properties><Property><Name>PackageSid</Name><Value>ms-app://s-1-15-2-3624382523-3073449496-1584155076-733487050-1832530571-3873708642-3859416007</Value></Property><Property><Name>SecretKey</Name><Value>Blz9qc7m94s6lM0nO7xwybMY0bDLy+aa</Value></Property><Property><Name>WindowsLiveEndpoint</Name><Value>https://login.live.com/accesstoken.srf</Value></Property></Properties></WnsCredential><AuthorizationRules><AuthorizationRule i:type=\"SharedAccessAuthorizationRule\"><ClaimType>SharedAccessKey</ClaimType><ClaimValue>None</ClaimValue><Rights><AccessRights>Listen</AccessRights></Rights><KeyName>DefaultListenSharedAccessSignature</KeyName><PrimaryKey>cVV3cmNZOCkkdXktXl8qbQ==</PrimaryKey></AuthorizationRule><AuthorizationRule i:type=\"SharedAccessAuthorizationRule\"><ClaimType>SharedAccessKey</ClaimType><ClaimValue>None</ClaimValue><Rights><AccessRights>Listen</AccessRights><AccessRights>Manage</AccessRights><AccessRights>Send</AccessRights></Rights><KeyName>DefaultFullSharedAccessSignature</KeyName><PrimaryKey>Kj5FUlB4UmM1KXAybD1RPQ==</PrimaryKey></AuthorizationRule></AuthorizationRules></NotificationHubDescription></content></entry></feed>", { 'transfer-encoding': 'chunked',
  'content-type': 'application/atom+xml;type=feed;charset=utf-8',
  server: 'Microsoft-HTTPAPI/2.0',
  date: 'Fri, 15 Mar 2013 01:58:46 GMT' });
 return result; },
function (nock) { 
var result = 
nock('https://ciserversb.servicebus.windows.net:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/xplathub2?api-version=2012-08', '*')
  .reply(201, "<entry xmlns=\"http://www.w3.org/2005/Atom\"><id>https://ciserversb.servicebus.windows.net/xplathub2?api-version=2012-08</id><title type=\"text\">xplathub2</title><published>2013-03-15T01:58:48Z</published><updated>2013-03-15T01:58:48Z</updated><author><name>ciserversb</name></author><link rel=\"self\" href=\"https://ciserversb.servicebus.windows.net/xplathub2?api-version=2012-08\"/><content type=\"application/xml\"><NotificationHubDescription xmlns=\"http://schemas.microsoft.com/netservices/2010/10/servicebus/connect\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\"><RegistrationTtl>P90D</RegistrationTtl><AuthorizationRules><AuthorizationRule i:type=\"SharedAccessAuthorizationRule\"><ClaimType>SharedAccessKey</ClaimType><ClaimValue>None</ClaimValue><Rights><AccessRights>Listen</AccessRights></Rights><CreatedTime>2013-03-15T01:58:49.0938583Z</CreatedTime><ModifiedTime>2013-03-15T01:58:49.0938583Z</ModifiedTime><KeyName>DefaultListenSharedAccessSignature</KeyName><PrimaryKey>a047R2MpVXZUdT8lQm9KWA==</PrimaryKey></AuthorizationRule><AuthorizationRule i:type=\"SharedAccessAuthorizationRule\"><ClaimType>SharedAccessKey</ClaimType><ClaimValue>None</ClaimValue><Rights><AccessRights>Listen</AccessRights><AccessRights>Manage</AccessRights><AccessRights>Send</AccessRights></Rights><CreatedTime>2013-03-15T01:58:49.0938583Z</CreatedTime><ModifiedTime>2013-03-15T01:58:49.0938583Z</ModifiedTime><KeyName>DefaultFullSharedAccessSignature</KeyName><PrimaryKey>JStmfVp1NlI6am1BZ3l9eA==</PrimaryKey></AuthorizationRule></AuthorizationRules></NotificationHubDescription></content></entry>", { 'transfer-encoding': 'chunked',
  'content-type': 'application/atom+xml;type=entry;charset=utf-8',
  server: 'Microsoft-HTTPAPI/2.0',
  date: 'Fri, 15 Mar 2013 01:58:49 GMT' });
 return result; },
function (nock) { 
var result = 
nock('https://ciserversb-sb.accesscontrol.windows.net:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/WRAPv0.9/', '*')
  .reply(200, "wrap_access_token=net.windows.servicebus.action%3dListen%252cManage%252cSend%26http%253a%252f%252fschemas.microsoft.com%252faccesscontrolservice%252f2010%252f07%252fclaims%252fidentityprovider%3dhttps%253a%252f%252fciserversb-sb.accesscontrol.windows.net%252f%26Audience%3dhttp%253a%252f%252fciserversb.servicebus.windows.net%252fxplathub2%252fMessages%26ExpiresOn%3d1363313930%26Issuer%3dhttps%253a%252f%252fciserversb-sb.accesscontrol.windows.net%252f%26HMACSHA256%3dYUwxDKPcB2mZztU12%252ftoQb1G8FQyP7A5cKlxFmpDkoQ%253d&wrap_access_token_expires_in=1199", { 'cache-control': 'no-cache, no-store',
  pragma: 'no-cache',
  'content-type': 'application/x-www-form-urlencoded; charset=us-ascii',
  expires: '-1',
  'request-id': 'a0814b3e-c2a8-442c-b5eb-5cdb650d0d95',
  'x-content-type-options': 'nosniff',
  date: 'Fri, 15 Mar 2013 01:58:49 GMT',
  'content-length': '555' });
 return result; },
function (nock) { 
var result = 
nock('https://ciserversb.servicebus.windows.net:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/xplathub2/Messages?api-version=2012-08', '*')
  .reply(201, "", { 'transfer-encoding': 'chunked',
  'content-type': 'application/xml; charset=utf-8',
  server: 'Microsoft-HTTPAPI/2.0',
  date: 'Fri, 15 Mar 2013 01:58:51 GMT' });
 return result; }]];