"use strict";

function Player(id, x, y, height, width, image) {
  var _image = new Image(),
      _x = x,
      _y = y,
      i;

  _image.src = image;

  return Actor(id).compose({
    draw: function (cxt) {
      cxt.drawImage(_image, _x * height, _y * width,
                    height, width);
    },

    // the player doesn't take automatic actions
    // TODO this should remove one from queue, try to do it
    // maybe it should dump queue if its illegal?
    //act: function (time, board) {
      //return true;
    //},

    // TODO this should queue actions
    // these still need to work w/ the board so pc appears to not move
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

    x: function () {
      return _x;
    },

    y: function () {
      return _y;
    },
  });
}

