"use strict";

function defaultCollision(a, b) {
  return a != b && a.x() === b.x() && a.y() === b.y();
}

// idk how to do real inheritence so a template will be fine too
function Actor(id) {
  var _id = id;

  return {
    draw: function (cxt) {
    },

    collide: function (actor) {
      return defaultCollision(this, actor);
    },

    // not sure about passing in the board, but such is the way
    act: function (time, board) {
      return true;
    },
  };
}

