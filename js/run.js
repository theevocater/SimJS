"use strict";

// globals
var screen = null;

var log = null;

var actors = [];

var running = true;

function Screen(canvas) {
  // need to blow up here.
  this.canvas = canvas || console.log("warn: unable to init canvas");
  this.height = 600;
  this.width = 600;
  this.canvas.width = this.width;
  this.canvas.height = this.height;
  this.clear = function (cxt) {
    cxt.fillStyle = "#FFFFFF";
    cxt.fillRect(0, 0, this.width, this.height);
  };
}

function randomDelta() {
  return Math.random() * 4 - 2;
}

function Ball(x, y, radius, xa, ya, color) {
  this.radius = radius || 15;

  this.x = x || 15;
  this.y = y || 15;

  if (this.x < 0 + this.radius) {
    this.x = this.radius;
  }
  if (this.x > screen.width - this.radius) {
    this.x = screen.width - this.radius;
  }

  if (this.y < 0 + this.radius) {
    this.y = this.radius;
  }
  if (this.y > screen.height - this.radius) {
    this.y = screen.height - this.radius;
  }
  //log(x + "," + y);

  this.xa = xa || randomDelta();
  this.ya = ya || randomDelta();
  this.color = color || "#000000";

  this.draw = function (cxt) {
    cxt.fillStyle = this.color;
    cxt.beginPath();
    // a circle is an arc from 0 to 2Pi
    cxt.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    cxt.closePath();
    cxt.fill();
  };

  this.act = function () {
    this.x = this.x + this.xa;
    this.y = this.y + this.ya;

    // TODO hack until we do collisions correctly
    if (this.x < 0 + this.radius) {
      this.x = this.radius;
      this.xa = Math.abs(this.xa);
    }
    if (this.x > screen.width - this.radius) {
      this.x = screen.width - this.radius;
      this.xa = -Math.abs(this.xa);
    }

    if (this.y < 0 + this.radius) {
      this.y = this.radius;
      this.ya = Math.abs(this.ya);
    }
    if (this.y > screen.height - this.radius) {
      this.y = screen.height - this.radius;
      this.ya = -Math.abs(this.ya);
    }
  };
}

function drawPause() {
  var cxt = screen.canvas.getContext("2d");
  cxt.fillStyle = "#000000";
  cxt.fillRect(screen.width / 4.0, screen.height / 4.0, screen.width / 6.0, screen.height / 2.0);
  cxt.fillRect(7.0 * screen.width / 12.0, screen.height / 4.0, screen.width / 6.0, screen.height / 2.0);
}

function pause() {
  if (running) {
    running = false;
    $("#pause").attr("value", "Play");
    drawPause();
  } else {
    running = true;
    $("#pause").attr("value", "Pause");
    run();
  }
}

function run() {
  var i, cxt;
  if (!running) {
    return;
  }
  cxt = screen.canvas.getContext("2d");
  screen.clear(cxt);
  if (actors.length === 0) {
    pause();
    return;
  }
  _.each(actors, function (element) {
    element.draw(cxt);
    element.act();
  })
  setTimeout(run, 16);
}

function start() {
  if (!running) {
    running = true;
    setTimeout(run, 16);
  }
}

function canvasClick(e) {
  var x = e.pageX - this.offsetLeft;
  var y = e.pageY - this.offsetTop;
  log.log(x + "," + y)
  add(x,y)
}

function addButton(e) {
  add();
}

function add(x, y) {
  actors.push(new Ball(x,y));

  if (actors.length === 1) {
    pause();
  }
}

function clear() {
  actors = [];
  log.clearLog();
}

$(document).ready(function () {
  $("#pause").click(pause);
  $("#add_ball").click(addButton);
  $("#clear").click(clear);
  $("canvas").click(canvasClick);
  screen = new Screen($("#myCanvas")[0]);
  log = new Log($("#log"));
  run();
});

// TODO
// we should probably programatically add the logging element somehow 
// if there isn't one passed in
// move it to another file
function Log(logElem) {
  this.logElem = logElem;
  this.log = function (text) {
    var newLog = $(document.createElement("p")).text(text).addClass("log");
    this.logElem.append(newLog);
  }

  this.clearLog = function () {
    this.logElem.html("")
  }
}
// TODO exception function
