"use strict";

// @returns [-1,4] -- [NoMove, N, E, S, W]
function randomDirection() {
  return Math.floor(Math.random() * 5) - 1;
}

function drawEnemy(cxt, image, x, y, height, width) {
  cxt.drawImage(image, x*height, y*width, height, width);
}

function Enemy(id, x, y, height, width, image) {
  this.id = id;

  this.image = new Image();
  this.image.src = image;

  this.x = x;
  this.y = y;

  this.height = height;
  this.width = width;

  this.oldX = x;
  this.oldY = y;

  // in ms
  this.actInterval = 1000;

  this.acted = Date.now();

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
    drawEnemy(cxt, this.image, this.x, this.y, this.height, this.width);
  };

  this.collide = function (actor) {
    return defaultCollision(this, actor);
  };

  this.rewind = function () {
    this.x = this.oldX;
    this.y = this.oldY;
  };

  this.act = function (time) {
    if ((time - this.acted) < this.actInterval) {
      return;
    }
    this.acted = time;
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

