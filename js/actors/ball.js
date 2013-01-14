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

function Ball(id, x, y, radius, color) {
  this.id = id;

  this.radius = radius || 16;

  this.x = x || 0;
  this.y = y || 0;

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
    return this != actor && this.x === actor.x && this.y === actor.y;
  };

  this.rewind = function () {
    this.x = this.oldX;
    this.y = this.oldY;
  };

  // remove to fix later
  this.act = function () {
    this.oldX = this.x;
    this.oldY = this.y;
    switch (randomDirection()) {
      case -1:
        break;

      case 0:
        this.y = this.y + 1;
      break;

      case 1:
        this.x = this.x + 1;
      break;

      case 2:
        this.y = this.y - 1;
      break;

      case 3:
        this.x = this.x - 1;
      break;
    }
  };
}

