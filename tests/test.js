require('simple-mocha');
var assert = require('assert');
var devicer = require('../');

var chromeOnOsx = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36";
var android = "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19";
var ipad = "Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10";
var iphone = "Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B329 Safari/8536.25";

describe('basic funcionalities', function() {
  it('should recognize a valid user agent', function() {
    assert.notEqual(null, devicer.parseUserAgent(chromeOnOsx));
  });

  it('should recognize an android user agent', function() {
    assert.notEqual(null, devicer.parseUserAgent(android));
  });

  it('should recognize an ipad user agent', function() {
    assert.notEqual(null, devicer.parseUserAgent(ipad));
  });

  it('should recognize an iphone user agent', function() {
    assert.notEqual(null, devicer.parseUserAgent(iphone));
  });
});
