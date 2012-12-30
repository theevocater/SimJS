"use strict";

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

var screen = null;

var actors = [];

var running = true;

function randomDelta() {
  return Math.random() * 2 - 1;
}

function Ball(x, y, radius, xa, ya, color) {
  this.radius = radius || 15;

  this.x = x || 15;
  this.y = y || 15;

  this.xa = xa || 2 + randomDelta();
  this.ya = ya || 2 + randomDelta();
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

    if (this.x < 0 + this.radius || this.x > screen.width - this.radius) {
      this.xa = -this.xa;
    }

    if (this.y < 0 + this.radius || this.y > screen.height - this.radius) {
      this.ya = -this.ya;
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
  for (i = 0; i < actors.length; i += 1) {
    actors[i].draw(cxt);
    actors[i].act();
  }
  setTimeout(run, 16);
}

function start() {
  if (!running) {
    running = true;
    setTimeout(run, 16);
  }
}

function add() {
  actors.push(new Ball());

  if (actors.length === 1) {
    pause();
  }
}

function clear() {
  actors = [];
}

$(document).ready(function () {
  $("#pause").click(pause);
  $("#add_ball").click(add);
  $("#clear").click(clear);
  screen = new Screen($("#myCanvas")[0]);
  run();
});

// TODO exception function
