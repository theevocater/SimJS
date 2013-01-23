"use strict";

function Player(id, x, y, height, width, image) {
  this.id = id;

  this.image = new Image();
  this.image.src = image;

  this.x = x;
  this.y = y;

  this.height = height;
  this.width = width;

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

  this.draw = function (cxt) {
    cxt.drawImage(this.image, this.x * this.height, this.y * this.width,
                  this.height, this.width);
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

