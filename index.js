var testUa = require('./user-agents'),
    errors = require('./errors');

var Devicer = function() {
  var self = this;
};


/**
 * Devicer##detect
 * Gets informations about user agent on a request object
 * @param requestObject the current request holding the user agent header to parse
 */
Devicer.prototype.detect = function(requestObject) {
  var userAgent = requestObject.get("User-Agent") || requestObject.get("user-agent");
  return this.parseUserAgent(userAgent);
};

/**
 * Devicer##parseUserAgent
 * Gets informations about a user agent string
 * @param ua the user agent header to parse
 */
Devicer.prototype.parseUserAgent = function(userAgent) {
  if(userAgent && typeof userAgent === 'string') {
    try {
      return testUa(userAgent);
    } catch(e) {
      throw e;
    }

  } else {
    throw new Error(errors.ERR_NOT_STRING);
  }
};

// Connect compliant middleware
Devicer.prototype.middleware = function(options) {
  options.propertyName = options.propertyName ? options.propertyName : 'device';
  options.propertyName = options.onError ? options.onError : function(err, req, res, next) {
    next(err);
  };
  options.propertyName = options.onSuccess ? options.onSuccess : function(req, res, next) {
    next();
  };

  return function(req, res, next) {
    try {
      req.device = self.detect(req);
      return options.onSuccess(req, res, next);
    } catch (e) {
      return options.onError(e, req, res, next);
    }
  };
};

module.exports = new Devicer();
