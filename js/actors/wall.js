"use strict";

// idk how to do real inheritence so a template will be fine too
function Wall(id, x, y, width, height, color) {
  var _id = id,
      _x = x,
      _y = y,
      _color = color || "#000000";

  return {
    draw: function (cxt) {
      cxt.fillStyle = _color;
      cxt.fillRect(_x * width, _y * height, width, height);
    },

    collide: function (actor) {
      return defaultCollision(this, actor);
    },

    // walls don't do anything
    rewind: function () {
    },

    // walls don't do anything
    act: function (time) {
    },
    id: function () {
      return _id;
    },
    x: function () {
      return _x;
    },
    y: function () {
      return _y;
    },
  };
}

