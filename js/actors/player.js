"use strict";

// @returns [-1,4] -- [NoMove, N, E, S, W]
function randomDirection() {
  return Math.floor(Math.random() * 5) - 1;
}

function drawCircle(cxt, x, y, radius, color) {
  cxt.fillStyle = color;
  cxt.beginPath();
  // a circle is an arc from 0 to 2Pi
  cxt.arc(x * radius * 2 + radius,
          y * radius * 2 + radius,
          radius, 0, Math.PI * 2, true);

  cxt.closePath();
  cxt.fill();
}

function Player(id, x, y, radius, color) {
  this.id = id;

  this.radius = radius || 16;

  this.x = x;
  this.y = y;

  this.oldX = x;
  this.oldY = y;

  if (this.x < 0) {
    this.x = 0;
  }

  if (this.x > screen.cols) {
    this.x = screen.cols;
  }

  if (this.y < 0) {
    this.y = 0;
  }
  if (this.y > screen.rows) {
    this.y = screen.rows;
  }

  this.color = color || "#000000";

  this.draw = function (cxt) {
    drawCircle(cxt, this.x, this.y, this.radius, this.color);
  };

  this.collide = function (actor) {
    return defaultCollision(this, actor);
  };

  this.rewind = function () {
    this.x = this.oldX;
    this.y = this.oldY;
  };

  // the player doesn't take automatic actions
  // TODO maybe we want to queue actions that the player is taking? Or
  // something anyway. We only draw every 16ms, so the player can move faster
  // than the framerate which is ~~
  this.act = function (time) {
  };

  this.left = function () {
    this.oldX = this.x;
    this.oldY = this.y;
    this.x = this.x - 1;
  };

  this.right = function () {
    this.oldX = this.x;
    this.oldY = this.y;
    this.x = this.x + 1;
  };

  this.up = function () {
    this.oldX = this.x;
    this.oldY = this.y;
    this.y = this.y - 1;
  };

  this.down = function () {
    this.oldX = this.x;
    this.oldY = this.y;
    this.y = this.y + 1;
  };
}

