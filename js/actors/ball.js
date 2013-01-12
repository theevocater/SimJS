"use strict";

// @returns [-1,4] -- [NoMove, N, E, S, W]
function randomDirection() {
  return Math.floor(Math.random() * 5) - 1;
}

function Ball(id, x, y, radius, color) {
  this.id = id;

  this.radius = radius || 16;

  this.x = x || 0;
  this.y = y || 0;

  this.oldx = x;
  this.oldy = y;

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
    cxt.fillStyle = this.color;
    cxt.beginPath();
    // a circle is an arc from 0 to 2Pi
    cxt.arc(this.x * this.radius * 2 + this.radius,
            this.y * this.radius * 2 + this.radius,
            this.radius, 0, Math.PI * 2, true);

    cxt.closePath();
    cxt.fill();
  };

  this.collide = function (ball) {
    return (this != ball && this.x === ball.x && this.y === ball.y);
  };

  this.rewind = function () {
    this.x = this.oldx;
    this.y = this.oldy;
  };

  // remove to fix later
  this.act = function () {
    var x = this.x, y = this.y;
    switch (randomDirection()) {
      case -1:
        break;

      case 0:
        y = y + 1;
      break;

      case 1:
        x = x + 1;
      break;

      case 2:
        y = y - 1;
      break;

      case 3:
        x = x - 1;
      break;
    }

    // TODO hack until we do collisions correctly
    if (!(x < 0 || x >= screen.cols || y < 0 || y >= screen.rows)) {
      this.oldx = this.x;
      this.oldy = this.y;
      this.x = x;
      this.y = y;
    }
  };
}

