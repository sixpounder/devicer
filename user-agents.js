var errors = require('./errors');
var ua = /^([a-zA-Z0-9]*\/[0-9\.]*)\s\(([a-zA-Z0-9\.\s\/]*;\s[a-zA-Z0-9\.\:\s_]*)(?:;?\s?([^\)]*))\)\s([a-zA-Z0-9\(\)]*\/[a-zA-Z0-9\,\.\s\(\)]*)?\s([a-zA-Z0-9\s]*\/?[a-zA-Z0-9\,\.\s\(\)]*)?\s([a-zA-Z0-9\s]*\/?[a-zA-Z0-9\,\.\s\(\)]*)?$/gm;

var infer = function(userAgent) {
  var features = {};

  var itemOrNoop = function(array, index) {
    if(array && array.length > index) {
      return array[index];
    } else {
      return "";
    }
  };

  var details = ua.exec(userAgent);
  if(details === null) {
    throw new Error(errors.ERR_PARSE);
  }
  return {
    original: itemOrNoop(details, 0),
    compliance: itemOrNoop(details, 1),
    platform: itemOrNoop(details, 2),
    build: itemOrNoop(details, 3),
    engine: itemOrNoop(details, 4),
    browser: itemOrNoop(details, 5)
  };
};

module.exports = infer;
