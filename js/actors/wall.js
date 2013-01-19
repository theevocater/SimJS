"use strict";

// idk how to do real inheritence so a template will be fine too
function Wall(id, x, y, width, height, color) {
  this.id = id;

  this.x = x;
  this.y = y;

  this.width = width;
  this.height = height;

  this.color = color || "#000000";

  this.draw = function (cxt) {
    cxt.fillStyle = this.color;
    cxt.fillRect(this.x * screen.grid_width, this.y * screen.grid_height, this.width, this.height);
  };

  this.collide = function (actor) {
    return defaultCollision(this, actor);
  };

  // walls don't do anything
  this.rewind = function () {
  };

  // walls don't do anything
  this.act = function (time) {
  };
}

