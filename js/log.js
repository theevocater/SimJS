// TODO
// we should probably programatically add the logging element somehow 
// if there isn't one passed in
function Log(logElem) {
  this.logElem = logElem;
  this.log = function (text) {
    var newLog = $(document.createElement("p")).text(text).addClass("log");
    this.logElem.append(newLog);
  }

  this.clearLog = function () {
    this.logElem.empty();
  }
}
