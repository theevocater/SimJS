"use strict";

// idk how to do real inheritence so a template will be fine too
function SimWalls(id) {
  var _id = id;

  return {
    draw: function (cxt) {
    },

    collide: function (actor) {
      return this != actor && actor.x() < 0 || actor.x() >= screen.cols || actor.y() < 0 || actor.y() >= screen.rows;
    },

    rewind: function () {
    },

    act: function () {
    },
  };
}

