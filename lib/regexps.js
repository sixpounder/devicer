module.exports = function() {
  this.genericUserAgent = /^([a-zA-Z0-9]*\/[0-9\.]*)\s?\(([a-zA-Z0-9\.\s\/\,\:]*;?\s?[a-zA-Z0-9\/\.\:\s_]*)(?:;?\s?([^\)]*))\)\s([a-zA-Z0-9\(\)]*\/?[a-zA-Z0-9\,\.\s\(\)]*)(.*)$/gm;
};
