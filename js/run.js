// defaults
function Screen(canvas) {
  // need to blow up here.
  this.canvas = canvas || console.log("warn: unable to init canvas");
  this.height = 768;
  this.width = 1024;
  this.clear = function (cxt) {
    cxt.fillStyle="#FFFFFF";
    cxt.fillRect(0, 0, screen.width, screen.height);
  }
}

var screen = null;

var actors = [];

var running = false;

function Ball(x, y, radius, xa, ya, color) {
  this.radius = radius || 15;

  this.x = x || 15;
  this.y = y || 15;

  this.xa = xa || 2;
  this.ya = ya || 2;
  this.color = color || "#000000";

  this.draw = drawBall;

  this.act = actBall;
}

// takes in a canvas context
function drawBall(cxt) {
  cxt.fillStyle = this.color;
  cxt.beginPath();
  // a circle is an arc from 0 to 2Pi
  cxt.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
  cxt.closePath();
  cxt.fill();
}

function actBall() {
  this.x = this.x + this.xa;
  this.y = this.y + this.ya;

  if( this.x < 0 + this.radius || this.x > screen.width - this.radius )
    this.xa = -this.xa;

  if( this.y < 0 + this.radius || this.y > screen.height - this.radius )
    this.ya = -this.ya;
}

function run() {
  if (!running || actors.length == 0)
    return;
  var cxt = screen.canvas.getContext("2d");
  screen.clear(cxt);
  for (var i = 0; i < actors.length; i++) {
    actors[i].draw(cxt);
    actors[i].act();
  }
  t = setTimeout('run()', 16);
}

function start() {
  if (!running) {
    running = true;
    t = setTimeout('run()', 16);
  }
}

function stop() {
  running = false;
}

function add() {
  actors.push(new Ball());
  console.log(actors.length);

  if (actors.length == 1)
    run();
}

$(document).ready(function() {
  $("#start").click(start);
  $("#stop").click(stop);
  $("#add_ball").click(add);
  screen = new Screen($("#myCanvas")[0]);
});

// TODO exception function
