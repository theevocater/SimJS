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
    cxt = cxt || screen.canvas.getContext("2d");
    cxt.fillStyle = "#FFFFFF";
    cxt.fillRect(0, 0, this.width, this.height);
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
