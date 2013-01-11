"use strict";

function randomDelta() {
  return Math.random() * 4 - 2;
}

function Ball(x, y, radius, xa, ya, color) {
  this.radius = radius || 16;

  this.x = x || radius;
  this.y = y || radius;

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

