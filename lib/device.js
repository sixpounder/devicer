var BrowserEngine = function BrowserEngine(data) {
  this.compliance = data.compliance             || "";
  this.platform   = data.platform               || "";
  this.name       = data.engine                 || "";
  var additional  = data.additionalInformations || "";

  this.isChrome = function() {
    return this.name.indexOf("Chrome") !== -1 || additional.indexOf("Chrome") !== -1;
  };

  this.isWebKit = function() {
    return this.name.indexOf("WebKit") !== -1 || additional.indexOf("WebKit") !== -1;
  };

  this.isFirefox = function() {
    return this.name.indexOf("Firefox") !== -1 || additional.indexOf("Firefox") !== -1;
  };

  this.isOpera = function() {
    return this.compliance.indexOf("Opera") !== -1 || additional.indexOf("Opera") !== -1;
  };

  this.isSafari = function() {
    return !this.isChrome() && (this.name.indexOf("Safari") !== -1 || additional.indexOf("Safari") !== -1);
  };

  this.isIE = function() {
    return this.platform.indexOf("MSIE") !== -1 || this.name.indexOf("MSIE") !== -1 || additional.indexOf("MSIE") !== -1 || this.name.indexOf("Edge") !== -1 || additional.indexOf("Edge") !== -1;
  };
};

var Device = function Device(data) {
  this.compliance             = data.compliance || "";
  this.platform               = data.platform   || "";
  this.build                  = data.build      || "";
  this.additionalInformations = data.additionalInformations || "";

  this.engine                 = new BrowserEngine(data);

  this.iPad    = data.iPad    || false;
  this.iPhone  = data.iPhone  || false;
  this.android = data.android || false;
  this.desktop = data.desktop || true;

  this.isIPad = function() {
    return this.platform.indexOf("iPad") !== -1;
  };

  this.isIPhone = function() {
    return this.platform.indexOf("iPhone") !== -1;
  };

  this.isIOS = function() {
    return this.isIPhone() || this.isIPad();
  };

  this.isAndroid = function() {
    return this.platform.indexOf("Android") !== -1 || this.build.indexOf('Android') !== -1;
  };

  this.isDesktop = function() {
    return !this.isIPhone() && !this.isIPad() && !this.isAndroid();
  };

  this.isMobile = function() {
    return !this.isDesktop();
  };

  this.isOSX = function() {
    return this.platform.indexOf("Mac OS X") !== -1;
  };

  this.isWin = function() {
    return this.platform.indexOf("Windows") !== -1;
  };

  this.isLinux = function() {
    return !this.isAndroid() && this.platform.indexOf("Linux") !== -1;
  };
};

module.exports = Device;
