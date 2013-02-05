"use strict";

// @returns [-1,4] -- [NoMove, N, E, S, W]
function randomDirection() {
  return Math.floor(Math.random() * 5) - 1;
}

function Enemy(id, x, y, height, width, image) {
  var _image = new Image(),
  _x = x,
  _y = y,
  _actInterval = 1000, // in ms
  _acted = Date.now(),
  i;

  _image.src = image;

  return Actor(id).compose({
    draw: function (cxt) {
      cxt.drawImage(_image, _x * height, _y * width, height, width);
    },

    act: function (time, board) {
      // save the old position
      var x = _x,
      y = _y;

      // check if its time to move
      if ((time - _acted) < _actInterval) {
        return;
      }

      _acted = time;

      switch (randomDirection()) {
        case -1:
          break;

        case 0:
          y = y + 1;
        break;

        case 1:
          x = x + 1;
        break;

        case 2:
          y = y - 1;
        break;

        case 3:
          x = x - 1;
        break;
      }

      // attempt to move, will return false if the move is illegal.
      // TODO: not sure this logic belongs here
      if (board.move(this, x, y)) {
        _x = x;
        _y = y;
      }
    },

    // getters
    x: function () {
      return _x;
    },

    y: function () {
      return _y;
    },
  });
}

