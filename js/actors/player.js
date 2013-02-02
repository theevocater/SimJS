"use strict";

function Player(id, x, y, height, width, image) {
  var _id = id,
      _image = new Image(),
      _x = x,
      _y = y;

  _image.src = image;

  return {
    draw: function (cxt) {
      cxt.drawImage(_image, _x * height, _y * width,
                    height, width);
    },

    collide: function (actor) {
      return defaultCollision(this, actor);
    },

    // the player doesn't take automatic actions
    // TODO this should remove one from queue, try to do it
    // maybe it should dump queue if its illegal?
    act: function (time, board) {
      return true;
    },

    // TODO this should queue actions
    left: function () {
      _x = _x - 1;
    },

    right: function () {
      _x = _x + 1;
    },

    up: function () {
      _y = _y - 1;
    },

    down: function () {
      _y = _y + 1;
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

