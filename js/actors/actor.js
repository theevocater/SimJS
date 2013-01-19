"use strict";

function defaultCollision(a, b) {
  return a != b && a.x === b.x && a.y === b.y;
}

// idk how to do real inheritence so a template will be fine too
function Actor(id) {
  this.id = id;

  this.draw = function (cxt) {
  };

  this.collide = function (actor) {
    return defaultCollision(this, actor);
  };

  this.rewind = function () {
  };

  this.act = function (time) {
  };
}

