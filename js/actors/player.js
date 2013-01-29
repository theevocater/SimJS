"use strict";

function Player(id, x, y, height, width, image) {
  var _id = id,
      _image = new Image(),
      _x = x,
      _y = y,
      _oldX = x,
      _oldY = y;

  _image.src = image;

  return {
    draw: function (cxt) {
      cxt.drawImage(_image, _x * height, _y * width,
                    height, width);
    },

    collide: function (actor) {
      return defaultCollision(this, actor);
    },

    rewind: function () {
      _x = _oldX;
      _y = _oldY;
    },

    // the player doesn't take automatic actions
    // TODO maybe we want to queue actions that the player is taking? Or
    // something anyway. We only draw every 16ms, so the player can move faster
    // than the framerate which is ~~
    act: function (time) {
    },

    left: function () {
      _oldX = _x;
      _oldY = _y;
      _x = _x - 1;
    },

    right: function () {
      _oldX = _x;
      _oldY = _y;
      _x = _x + 1;
    },

    up: function () {
      _oldX = _x;
      _oldY = _y;
      _y = _y - 1;
    },

    down: function () {
      _oldX = _x;
      _oldY = _y;
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

