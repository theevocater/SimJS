// TODO
// we should probably programatically add the logging element somehow 
// if there isn't one passed in
var log = (function () {
  var _logElem = null;

  return {
    init: function (elem) {
      _logElem = elem;
    },

    log: function (text) {
      var newLog = $(document.createElement("p")).text(text).addClass("log");
      _logElem.append(newLog);
    },

    clearLog: function () {
      _logElem.empty();
    },
  };
}());
