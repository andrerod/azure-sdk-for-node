// This file has been autogenerated.

exports.scopes = [[function (nock) { 
var result = 
nock('https://ciserversb-sb.accesscontrol.windows.net:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/WRAPv0.9/', '*')
  .reply(200, "wrap_access_token=net.windows.servicebus.action%3dListen%252cManage%252cSend%26http%253a%252f%252fschemas.microsoft.com%252faccesscontrolservice%252f2010%252f07%252fclaims%252fidentityprovider%3dhttps%253a%252f%252fciserversb-sb.accesscontrol.windows.net%252f%26Audience%3dhttp%253a%252f%252fciserversb.servicebus.windows.net%252f%2524Resources%252fNotificationHubs%26ExpiresOn%3d1362677804%26Issuer%3dhttps%253a%252f%252fciserversb-sb.accesscontrol.windows.net%252f%26HMACSHA256%3dGsu4qS2mI0xtQ1NS4YshzYSYQLHO5G6zNFWSeb9RI%252bY%253d&wrap_access_token_expires_in=1199", { 'cache-control': 'no-cache, no-store',
  pragma: 'no-cache',
  'content-type': 'application/x-www-form-urlencoded; charset=us-ascii',
  expires: '-1',
  'request-id': 'e74fdf92-ff18-4429-b023-3766101c304f',
  'x-content-type-options': 'nosniff',
  date: 'Thu, 07 Mar 2013 17:16:43 GMT',
  'content-length': '568' });
 return result; },
function (nock) { 
var result = 
nock('https://ciserversb.servicebus.windows.net:443')
  .get('/$Resources/NotificationHubs')
  .reply(200, "<feed xmlns=\"http://www.w3.org/2005/Atom\"><title type=\"text\">NotificationHubs</title><id>https://ciserversb.servicebus.windows.net/$Resources/NotificationHubs</id><updated>2013-03-07T17:16:43Z</updated><link rel=\"self\" href=\"https://ciserversb.servicebus.windows.net/$Resources/NotificationHubs\"/><entry xml:base=\"https://ciserversb.servicebus.windows.net/$Resources/NotificationHubs\"><id>https://ciserversb.servicebus.windows.net/myhub</id><title type=\"text\">myhub</title><published>2013-02-23T00:22:23Z</published><updated>2013-02-28T14:27:57Z</updated><author><name>ciserversb</name></author><link rel=\"self\" href=\"../myhub\"/><content type=\"application/xml\"><NotificationHubDescription xmlns=\"http://schemas.microsoft.com/netservices/2010/10/servicebus/connect\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\"><RegistrationTtl>P90D</RegistrationTtl><WnsCredential><Properties><Property><Name>PackageSid</Name><Value>ms-app://s-1-15-2-3624382523-3073449496-1584155076-733487050-1832530571-3873708642-3859416007</Value></Property><Property><Name>SecretKey</Name><Value>Blz9qc7m94s6lM0nO7xwybMY0bDLy+aa</Value></Property><Property><Name>WindowsLiveEndpoint</Name><Value>https://login.live.com/accesstoken.srf</Value></Property></Properties></WnsCredential><AuthorizationRules><AuthorizationRule i:type=\"SharedAccessAuthorizationRule\"><ClaimType>SharedAccessKey</ClaimType><ClaimValue>None</ClaimValue><Rights><AccessRights>Listen</AccessRights></Rights><KeyName>DefaultListenSharedAccessSignature</KeyName><PrimaryKey>cVV3cmNZOCkkdXktXl8qbQ==</PrimaryKey></AuthorizationRule><AuthorizationRule i:type=\"SharedAccessAuthorizationRule\"><ClaimType>SharedAccessKey</ClaimType><ClaimValue>None</ClaimValue><Rights><AccessRights>Listen</AccessRights><AccessRights>Manage</AccessRights><AccessRights>Send</AccessRights></Rights><KeyName>DefaultFullSharedAccessSignature</KeyName><PrimaryKey>Kj5FUlB4UmM1KXAybD1RPQ==</PrimaryKey></AuthorizationRule></AuthorizationRules></NotificationHubDescription></content></entry><entry xml:base=\"https://ciserversb.servicebus.windows.net/$Resources/NotificationHubs\"><id>https://ciserversb.servicebus.windows.net/xplathub2</id><title type=\"text\">xplathub2</title><published>2013-03-07T17:15:56Z</published><updated>2013-03-07T17:15:56Z</updated><author><name>ciserversb</name></author><link rel=\"self\" href=\"../xplathub2\"/><content type=\"application/xml\"><NotificationHubDescription xmlns=\"http://schemas.microsoft.com/netservices/2010/10/servicebus/connect\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\"><RegistrationTtl>P90D</RegistrationTtl><AuthorizationRules><AuthorizationRule i:type=\"SharedAccessAuthorizationRule\"><ClaimType>SharedAccessKey</ClaimType><ClaimValue>None</ClaimValue><Rights><AccessRights>Listen</AccessRights></Rights><CreatedTime>2013-03-07T17:15:58.8710684Z</CreatedTime><ModifiedTime>2013-03-07T17:15:58.8710684Z</ModifiedTime><KeyName>DefaultListenSharedAccessSignature</KeyName><PrimaryKey>OHplcnR8MGFUOz17VkVQbA==</PrimaryKey></AuthorizationRule><AuthorizationRule i:type=\"SharedAccessAuthorizationRule\"><ClaimType>SharedAccessKey</ClaimType><ClaimValue>None</ClaimValue><Rights><AccessRights>Listen</AccessRights><AccessRights>Manage</AccessRights><AccessRights>Send</AccessRights></Rights><CreatedTime>2013-03-07T17:15:58.8710684Z</CreatedTime><ModifiedTime>2013-03-07T17:15:58.8710684Z</ModifiedTime><KeyName>DefaultFullSharedAccessSignature</KeyName><PrimaryKey>dl5XaThmMV87bGQyPWJhcQ==</PrimaryKey></AuthorizationRule></AuthorizationRules></NotificationHubDescription></content></entry></feed>", { 'transfer-encoding': 'chunked',
  'content-type': 'application/atom+xml;type=feed;charset=utf-8',
  server: 'Microsoft-HTTPAPI/2.0',
  date: 'Thu, 07 Mar 2013 17:16:43 GMT' });
 return result; },
function (nock) { 
var result = 
nock('https://ciserversb-sb.accesscontrol.windows.net:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/WRAPv0.9/', '*')
  .reply(200, "wrap_access_token=net.windows.servicebus.action%3dListen%252cManage%252cSend%26http%253a%252f%252fschemas.microsoft.com%252faccesscontrolservice%252f2010%252f07%252fclaims%252fidentityprovider%3dhttps%253a%252f%252fciserversb-sb.accesscontrol.windows.net%252f%26Audience%3dhttp%253a%252f%252fciserversb.servicebus.windows.net%252fxplathub1%26ExpiresOn%3d1362677805%26Issuer%3dhttps%253a%252f%252fciserversb-sb.accesscontrol.windows.net%252f%26HMACSHA256%3dFHuV8tPg9oaDwSsSl3gokSbsP7zFz8gI3fqI5%252fS9RBI%253d&wrap_access_token_expires_in=1199", { 'cache-control': 'no-cache, no-store',
  pragma: 'no-cache',
  'content-type': 'application/x-www-form-urlencoded; charset=us-ascii',
  expires: '-1',
  'request-id': '7faab974-3c7b-47fc-9a35-954beac5de25',
  'x-content-type-options': 'nosniff',
  date: 'Thu, 07 Mar 2013 17:16:45 GMT',
  'content-length': '542' });
 return result; },
function (nock) { 
var result = 
nock('https://ciserversb-sb.accesscontrol.windows.net:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/WRAPv0.9/', '*')
  .reply(200, "wrap_access_token=net.windows.servicebus.action%3dListen%252cManage%252cSend%26http%253a%252f%252fschemas.microsoft.com%252faccesscontrolservice%252f2010%252f07%252fclaims%252fidentityprovider%3dhttps%253a%252f%252fciserversb-sb.accesscontrol.windows.net%252f%26Audience%3dhttp%253a%252f%252fciserversb.servicebus.windows.net%252fxplathub2%26ExpiresOn%3d1362677804%26Issuer%3dhttps%253a%252f%252fciserversb-sb.accesscontrol.windows.net%252f%26HMACSHA256%3dCjLCutyvfAUXST6ySdlVTz3BBz4pccLDB4uW1EF5xuo%253d&wrap_access_token_expires_in=1199", { 'cache-control': 'no-cache, no-store',
  pragma: 'no-cache',
  'content-type': 'application/x-www-form-urlencoded; charset=us-ascii',
  expires: '-1',
  'request-id': '3224d381-b633-4766-96bc-338c9577c525',
  'x-content-type-options': 'nosniff',
  date: 'Thu, 07 Mar 2013 17:16:44 GMT',
  'content-length': '538' });
 return result; },
function (nock) { 
var result = 
nock('https://ciserversb.servicebus.windows.net:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/xplathub1', '*')
  .reply(201, "<entry xmlns=\"http://www.w3.org/2005/Atom\"><id>https://ciserversb.servicebus.windows.net/xplathub1</id><title type=\"text\">xplathub1</title><published>2013-03-07T17:16:46Z</published><updated>2013-03-07T17:16:46Z</updated><author><name>ciserversb</name></author><link rel=\"self\" href=\"https://ciserversb.servicebus.windows.net/xplathub1\"/><content type=\"application/xml\"><NotificationHubDescription xmlns=\"http://schemas.microsoft.com/netservices/2010/10/servicebus/connect\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\"><RegistrationTtl>P90D</RegistrationTtl><AuthorizationRules><AuthorizationRule i:type=\"SharedAccessAuthorizationRule\"><ClaimType>SharedAccessKey</ClaimType><ClaimValue>None</ClaimValue><Rights><AccessRights>Listen</AccessRights></Rights><CreatedTime>2013-03-07T17:16:45.7355198Z</CreatedTime><ModifiedTime>2013-03-07T17:16:45.7355198Z</ModifiedTime><KeyName>DefaultListenSharedAccessSignature</KeyName><PrimaryKey>fTMzWF5XLXBhVmcrZzNZZw==</PrimaryKey></AuthorizationRule><AuthorizationRule i:type=\"SharedAccessAuthorizationRule\"><ClaimType>SharedAccessKey</ClaimType><ClaimValue>None</ClaimValue><Rights><AccessRights>Listen</AccessRights><AccessRights>Manage</AccessRights><AccessRights>Send</AccessRights></Rights><CreatedTime>2013-03-07T17:16:45.7355198Z</CreatedTime><ModifiedTime>2013-03-07T17:16:45.7355198Z</ModifiedTime><KeyName>DefaultFullSharedAccessSignature</KeyName><PrimaryKey>cUBvd15jVG1ASiQzZ2FPVA==</PrimaryKey></AuthorizationRule></AuthorizationRules></NotificationHubDescription></content></entry>", { 'transfer-encoding': 'chunked',
  'content-type': 'application/atom+xml;type=entry;charset=utf-8',
  server: 'Microsoft-HTTPAPI/2.0',
  date: 'Thu, 07 Mar 2013 17:16:45 GMT' });
 return result; },
function (nock) { 
var result = 
nock('https://ciserversb.servicebus.windows.net:443')
  .delete('/xplathub2')
  .reply(200, "", { 'content-length': '0',
  server: 'Microsoft-HTTPAPI/2.0',
  date: 'Thu, 07 Mar 2013 17:16:48 GMT' });
 return result; },
function (nock) { 
var result = 
nock('https://ciserversb-sb.accesscontrol.windows.net:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/WRAPv0.9/', '*')
  .reply(200, "wrap_access_token=net.windows.servicebus.action%3dListen%252cManage%252cSend%26http%253a%252f%252fschemas.microsoft.com%252faccesscontrolservice%252f2010%252f07%252fclaims%252fidentityprovider%3dhttps%253a%252f%252fciserversb-sb.accesscontrol.windows.net%252f%26Audience%3dhttp%253a%252f%252fciserversb.servicebus.windows.net%252fxplathub1%252fMessages%26ExpiresOn%3d1362677809%26Issuer%3dhttps%253a%252f%252fciserversb-sb.accesscontrol.windows.net%252f%26HMACSHA256%3dYQy7I9vm5aMarWaAoxiFCpRXEtjGhMEnM1RX8y6gxc8%253d&wrap_access_token_expires_in=1199", { 'cache-control': 'no-cache, no-store',
  pragma: 'no-cache',
  'content-type': 'application/x-www-form-urlencoded; charset=us-ascii',
  expires: '-1',
  'request-id': '67900263-89b7-46b1-b059-3e2acdf55183',
  'x-content-type-options': 'nosniff',
  date: 'Thu, 07 Mar 2013 17:16:49 GMT',
  'content-length': '551' });
 return result; },
function (nock) { 
var result = 
nock('https://ciserversb.servicebus.windows.net:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/xplathub1/Messages', '*')
  .reply(201, "", { 'transfer-encoding': 'chunked',
  'content-type': 'application/xml; charset=utf-8',
  server: 'Microsoft-HTTPAPI/2.0',
  date: 'Thu, 07 Mar 2013 17:16:51 GMT' });
 return result; }],
[function (nock) { 
var result = 
nock('https://ciserversb.servicebus.windows.net:443')
  .get('/$Resources/NotificationHubs')
  .reply(200, "<feed xmlns=\"http://www.w3.org/2005/Atom\"><title type=\"text\">NotificationHubs</title><id>https://ciserversb.servicebus.windows.net/$Resources/NotificationHubs</id><updated>2013-03-07T17:16:50Z</updated><link rel=\"self\" href=\"https://ciserversb.servicebus.windows.net/$Resources/NotificationHubs\"/><entry xml:base=\"https://ciserversb.servicebus.windows.net/$Resources/NotificationHubs\"><id>https://ciserversb.servicebus.windows.net/myhub</id><title type=\"text\">myhub</title><published>2013-02-23T00:22:23Z</published><updated>2013-02-28T14:27:57Z</updated><author><name>ciserversb</name></author><link rel=\"self\" href=\"../myhub\"/><content type=\"application/xml\"><NotificationHubDescription xmlns=\"http://schemas.microsoft.com/netservices/2010/10/servicebus/connect\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\"><RegistrationTtl>P90D</RegistrationTtl><WnsCredential><Properties><Property><Name>PackageSid</Name><Value>ms-app://s-1-15-2-3624382523-3073449496-1584155076-733487050-1832530571-3873708642-3859416007</Value></Property><Property><Name>SecretKey</Name><Value>Blz9qc7m94s6lM0nO7xwybMY0bDLy+aa</Value></Property><Property><Name>WindowsLiveEndpoint</Name><Value>https://login.live.com/accesstoken.srf</Value></Property></Properties></WnsCredential><AuthorizationRules><AuthorizationRule i:type=\"SharedAccessAuthorizationRule\"><ClaimType>SharedAccessKey</ClaimType><ClaimValue>None</ClaimValue><Rights><AccessRights>Listen</AccessRights></Rights><KeyName>DefaultListenSharedAccessSignature</KeyName><PrimaryKey>cVV3cmNZOCkkdXktXl8qbQ==</PrimaryKey></AuthorizationRule><AuthorizationRule i:type=\"SharedAccessAuthorizationRule\"><ClaimType>SharedAccessKey</ClaimType><ClaimValue>None</ClaimValue><Rights><AccessRights>Listen</AccessRights><AccessRights>Manage</AccessRights><AccessRights>Send</AccessRights></Rights><KeyName>DefaultFullSharedAccessSignature</KeyName><PrimaryKey>Kj5FUlB4UmM1KXAybD1RPQ==</PrimaryKey></AuthorizationRule></AuthorizationRules></NotificationHubDescription></content></entry></feed>", { 'transfer-encoding': 'chunked',
  'content-type': 'application/atom+xml;type=feed;charset=utf-8',
  server: 'Microsoft-HTTPAPI/2.0',
  date: 'Thu, 07 Mar 2013 17:16:50 GMT' });
 return result; },
function (nock) { 
var result = 
nock('https://ciserversb.servicebus.windows.net:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/xplathub2', '*')
  .reply(201, "<entry xmlns=\"http://www.w3.org/2005/Atom\"><id>https://ciserversb.servicebus.windows.net/xplathub2</id><title type=\"text\">xplathub2</title><published>2013-03-07T17:16:51Z</published><updated>2013-03-07T17:16:51Z</updated><author><name>ciserversb</name></author><link rel=\"self\" href=\"https://ciserversb.servicebus.windows.net/xplathub2\"/><content type=\"application/xml\"><NotificationHubDescription xmlns=\"http://schemas.microsoft.com/netservices/2010/10/servicebus/connect\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\"><RegistrationTtl>P90D</RegistrationTtl><AuthorizationRules><AuthorizationRule i:type=\"SharedAccessAuthorizationRule\"><ClaimType>SharedAccessKey</ClaimType><ClaimValue>None</ClaimValue><Rights><AccessRights>Listen</AccessRights></Rights><CreatedTime>2013-03-07T17:16:53.8824047Z</CreatedTime><ModifiedTime>2013-03-07T17:16:53.8824047Z</ModifiedTime><KeyName>DefaultListenSharedAccessSignature</KeyName><PrimaryKey>IVQqS3ZZVy00RXN6a1pTQA==</PrimaryKey></AuthorizationRule><AuthorizationRule i:type=\"SharedAccessAuthorizationRule\"><ClaimType>SharedAccessKey</ClaimType><ClaimValue>None</ClaimValue><Rights><AccessRights>Listen</AccessRights><AccessRights>Manage</AccessRights><AccessRights>Send</AccessRights></Rights><CreatedTime>2013-03-07T17:16:53.8824047Z</CreatedTime><ModifiedTime>2013-03-07T17:16:53.8824047Z</ModifiedTime><KeyName>DefaultFullSharedAccessSignature</KeyName><PrimaryKey>I0pNITpwSGkhO1t8QSojTw==</PrimaryKey></AuthorizationRule></AuthorizationRules></NotificationHubDescription></content></entry>", { 'transfer-encoding': 'chunked',
  'content-type': 'application/atom+xml;type=entry;charset=utf-8',
  server: 'Microsoft-HTTPAPI/2.0',
  date: 'Thu, 07 Mar 2013 17:16:53 GMT' });
 return result; },
function (nock) { 
var result = 
nock('https://ciserversb-sb.accesscontrol.windows.net:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/WRAPv0.9/', '*')
  .reply(200, "wrap_access_token=net.windows.servicebus.action%3dListen%252cManage%252cSend%26http%253a%252f%252fschemas.microsoft.com%252faccesscontrolservice%252f2010%252f07%252fclaims%252fidentityprovider%3dhttps%253a%252f%252fciserversb-sb.accesscontrol.windows.net%252f%26Audience%3dhttp%253a%252f%252fciserversb.servicebus.windows.net%252fxplathub2%252fMessages%26ExpiresOn%3d1362677813%26Issuer%3dhttps%253a%252f%252fciserversb-sb.accesscontrol.windows.net%252f%26HMACSHA256%3dnyL0SMm4tgdIGRd7O9%252fLqCk1U%252b%252fUuMyba9mlEuhYG10%253d&wrap_access_token_expires_in=1199", { 'cache-control': 'no-cache, no-store',
  pragma: 'no-cache',
  'content-type': 'application/x-www-form-urlencoded; charset=us-ascii',
  expires: '-1',
  'request-id': '0d1ecb6b-77ce-462b-8cc9-7a1ca6104e36',
  'x-content-type-options': 'nosniff',
  date: 'Thu, 07 Mar 2013 17:16:53 GMT',
  'content-length': '563' });
 return result; },
function (nock) { 
var result = 
nock('https://ciserversb.servicebus.windows.net:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/xplathub2/Messages', '*')
  .reply(201, "", { 'transfer-encoding': 'chunked',
  'content-type': 'application/xml; charset=utf-8',
  server: 'Microsoft-HTTPAPI/2.0',
  date: 'Thu, 07 Mar 2013 17:16:53 GMT' });
 return result; }]];