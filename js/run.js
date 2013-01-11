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
  this.width = this.grid_width*16+1;
  this.height = this.grid_height*16+1;
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
    for (i = 0; i < this.width/this.grid_width; i++) {
      cxt.strokeStyle = "#000000";
      cxt.beginPath();
      cxt.moveTo(i*this.grid_width,0);
      cxt.lineTo(i*this.grid_width, this.height);
      cxt.closePath();
      cxt.stroke();
    }

    for (i = 0; i < this.height/this.grid_height; i++) {
      cxt.strokeStyle = "#000000";
      cxt.beginPath();
      cxt.moveTo(0, i*this.grid_height);
      cxt.lineTo(this.width, i*this.grid_height);
      cxt.closePath();
      cxt.stroke();
    }
  };

  this.pause = function () {
    var cxt = screen.canvas.getContext("2d");
    cxt.fillStyle = "#000000";
    cxt.fillRect(screen.width / 4.0, screen.height / 4.0, screen.width / 6.0, screen.height / 2.0);
    cxt.fillRect(7.0 * screen.width / 12.0, screen.height / 4.0, screen.width / 6.0, screen.height / 2.0);
  }
}

function randomDelta() {
  return Math.random() * 4 - 2;
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
  screen.clear();
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
