"use strict";

function Wall(id, x, y, width, height, color) {
  var _x = x,
  _y = y,
  _color = color || "#000000";

  return Actor(id).compose({
    draw: function (cxt) {
      cxt.fillStyle = _color;
      cxt.fillRect(_x * width, _y * height, width, height);
    },

    x: function () {
      return _x;
    },

    y: function () {
      return _y;
    },
  });
}

