"use strict";

// globals
var screen = null;

var log = null;

var actors = [];

var running = true;

function Screen(canvas) {
  // need to blow up here.
  this.canvas = canvas || console.log("warn: unable to init canvas");
  this.grid_height = 32;
  this.grid_width = 32;
  this.cols = 16;
  this.rows = 16;
  this.width = this.grid_width * this.cols + 0;
  this.height = this.grid_height * this.rows + 0;
  this.canvas.width = this.width;
  this.canvas.height = this.height;
  this.clear = function (cxt) {
    cxt = cxt || screen.canvas.getContext("2d");
    cxt.fillStyle = "#FFFFFF";
    cxt.fillRect(0, 0, this.width, this.height);
  };

  this.grid = function (cxt) {
    var i;
    cxt = cxt || screen.canvas.getContext("2d");
    for (i = 0; i <= this.cols; i += 1) {
      cxt.strokeStyle = "#000000";
      cxt.beginPath();
      cxt.moveTo(i * this.grid_width, 0);
      cxt.lineTo(i * this.grid_width, this.height);
      cxt.closePath();
      cxt.stroke();
    }

    for (i = 0; i <= this.rows; i += 1) {
      cxt.strokeStyle = "#000000";
      cxt.beginPath();
      cxt.moveTo(0, i * this.grid_height);
      cxt.lineTo(this.width, i * this.grid_height);
      cxt.closePath();
      cxt.stroke();
    }
  };

  this.pause = function () {
    var cxt = screen.canvas.getContext("2d");
    cxt.fillStyle = "#000000";
    cxt.fillRect(screen.width / 4.0, screen.height / 4.0, screen.width / 6.0, screen.height / 2.0);
    cxt.fillRect(7.0 * screen.width / 12.0, screen.height / 4.0, screen.width / 6.0, screen.height / 2.0);
  };
}

function pause() {
  if (running) {
    running = false;
    $("#pause").attr("value", "Play");
    screen.pause();
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
  screen.grid(cxt);
  if (actors.length === 0) {
    pause();
    return;
  }

  _.each(actors, function (element) {
    element.act();
  });

  _.each(actors, function (element) {
    element.draw(cxt);
  });

  setTimeout(run, 100);
}

function start() {
  if (!running) {
    running = true;
    run();
  }
}

function canvasClick(e) {
  var x = Math.floor((e.pageX - this.offsetLeft) / screen.grid_width);
  var y = Math.floor((e.pageY - this.offsetTop) / screen.grid_height);
  add(x, y);
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
  // TODO if no log element, replace with donothing logger
  log = new Log($("#log"));
  run();
});

// TODO exception function
