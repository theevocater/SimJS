"use strict";

function Player(id, x, y, height, width, image) {
  var _image = new Image(),
      _x = x,
      _y = y,
      i;

  _image.src = image;

  function move(player,x,y) {
    if (board.move(player, x, y)) {
      _x = x;
      _y = y;
    }
  }

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
    left: function () {
      move(this, _x - 1, _y);
    },

    right: function () {
      move(this, _x + 1, _y);
    },

    up: function () {
      move(this, _x, _y - 1);
    },

    down: function () {
      move(this, _x, _y + 1);
    },

    x: function () {
      return _x;
    },

    y: function () {
      return _y;
    },
  });
}

