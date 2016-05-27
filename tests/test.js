require('simple-mocha');
var assert = require('assert');
var devicer = require('../');

var chromeOnOsx = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36";
var android = "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19";
var ipad = "Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10";
var iphone = "Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B329 Safari/8536.25";

describe("devicer", function() {
  describe('basic functionalities', function() {
    it('parses a valid user agent', function() {
      var obj = devicer.parseUserAgent(chromeOnOsx);
      assert.notEqual(null, obj);
      assert.notEqual("", obj.compliance);
      assert.equal(true, obj.isDesktop());
      assert.equal(true, obj.engine.isChrome());
    });

    it('parses an android user agent', function() {
      var obj = devicer.parseUserAgent(android);
      assert.notEqual(null, obj);
      assert.notEqual("", obj.compliance);
      assert.equal(true, obj.isAndroid());
    });

    it('parses an ipad user agent', function() {
      var obj = devicer.parseUserAgent(ipad);
      assert.notEqual(null, obj);
      assert.notEqual("", obj.compliance);
      assert.equal(true, obj.isIPad());
    });

    it('parses an iphone user agent', function() {
      var obj = devicer.parseUserAgent(iphone);
      assert.notEqual(null, obj);
      assert.notEqual("", obj.compliance);
      assert.equal(true, obj.isIPhone());
    });
  });

  describe('output formatting', function() {
    it('has all minimal expected properties', function() {
      var obj = devicer.parseUserAgent(iphone);
      assert.notEqual(null, obj);
      assert.notEqual("", obj.compliance);
      assert.notEqual("", obj.platform);
      assert.notEqual(undefined, obj.build);
      assert.notEqual(undefined, obj.engine);
      assert.notEqual("", obj.additional);
    });

    it('has all minimal expected properties with build attribute', function() {
      var obj = devicer.parseUserAgent(android);
      assert.notEqual(null, obj);
      assert.notEqual("", obj.compliance);
      assert.notEqual("", obj.platform);
      assert.notEqual("", obj.build);
      assert.notEqual(undefined , obj.engine);
      assert.notEqual("", obj.additional);
    });
  });

  describe('middleware', function() {
    it('correctly handles middleware chain', function() {
      var fn = devicer.middleware();
      var MockReq = function() {
        this.get = function() {
          return android;
        };
      };
      var req = new MockReq();

      var next = function() {
        return "OK";
      };

      assert.equal("function", typeof fn);
      assert.equal("OK", fn(req, {}, next));
    });

    it('registers custom property name on request object', function() {
      var MockReq = function() {
        this.get = function() {
          return android;
        };
      };
      var req = new MockReq();

      var next = function() {
        return "OK";
      };

      var fn = devicer.middleware({
        propertyName: 'myShit',
        onSuccess: function(req, res, next) {
          assert.notEqual(undefined, req.myShit);
        }
      });

      assert.equal("function", typeof fn);

      fn(req, {}, next);

    });
  });

});
