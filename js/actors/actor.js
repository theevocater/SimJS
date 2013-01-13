"use strict";

// idk how to do real inheritence so a template will be fine too
function Actor(id) {
  this.id = id;

  this.draw = function (cxt) {
  };

  this.collide = function (actor) {
    if (this == actor)
      return false;
    return false;
  };

  this.rewind = function () {
  };

  this.act = function () {
  };
}

