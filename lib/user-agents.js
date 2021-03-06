var errors  = require('./errors');
var REGEXPS = require('./regexps');
var Device  = require('./device');

var infer = function(userAgent) {
  var features = {};

  var regexps = new REGEXPS();

  var itemOrNoop = function(array, index) {
    if(array && array.length > index) {
      return array[index];
    } else {
      return "";
    }
  };

  var details = regexps.genericUserAgent.exec(userAgent);
  if(details === null) {
    return null;
  } else {
    return new Device({
      match: itemOrNoop(details, 0),
      compliance: itemOrNoop(details, 1),
      platform: itemOrNoop(details, 2),
      build: itemOrNoop(details, 3),
      engine: itemOrNoop(details, 4),
      additionalInformations: itemOrNoop(details, 5),
    });
  }

};

module.exports = infer;
