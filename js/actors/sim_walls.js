"use strict";

// idk how to do real inheritence so a template will be fine too
function SimWalls(id) {
  this.id = id;

  this.draw = function (cxt) {
  };

  this.collide = function (actor) {
    return this != actor && actor.x < 0 || actor.x >= screen.cols || actor.y < 0 || actor.y >= screen.rows;
  };

  this.rewind = function () {
  };

  this.act = function () {
  };
}

