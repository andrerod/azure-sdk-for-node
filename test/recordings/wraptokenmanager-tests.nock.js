// This file has been autogenerated.

exports.scopes = [[function (nock) { 
var result = 
nock('https://ciserversb-sb.accesscontrol.windows.net:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/WRAPv0.9/', '*')
  .reply(200, "wrap_access_token=net.windows.servicebus.action%3dListen%252cManage%252cSend%26http%253a%252f%252fschemas.microsoft.com%252faccesscontrolservice%252f2010%252f07%252fclaims%252fidentityprovider%3dhttps%253a%252f%252fciserversb-sb.accesscontrol.windows.net%252f%26Audience%3dhttp%253a%252f%252fciserversb.servicebus.windows.net%252fmyqueue%26ExpiresOn%3d1361412323%26Issuer%3dhttps%253a%252f%252fciserversb-sb.accesscontrol.windows.net%252f%26HMACSHA256%3dVSHlFwHDnZX1Ykyy74rE%252f5mDcMST7yfs245ilgIXt2g%253d&wrap_access_token_expires_in=1200", { 'cache-control': 'no-cache, no-store',
  pragma: 'no-cache',
  'content-type': 'application/x-www-form-urlencoded; charset=us-ascii',
  expires: '-1',
  'request-id': 'b9f81917-5fd7-40ab-9ec0-8be63209bc47',
  'x-content-type-options': 'nosniff',
  date: 'Thu, 21 Feb 2013 01:45:22 GMT',
  'content-length': '540' });
 return result; }]];