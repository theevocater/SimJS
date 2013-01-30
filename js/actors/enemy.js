"use strict";

// @returns [-1,4] -- [NoMove, N, E, S, W]
function randomDirection() {
  return Math.floor(Math.random() * 5) - 1;
}

function drawEnemy(cxt, image, x, y, height, width) {
  cxt.drawImage(image, x*height, y*width, height, width);
}

function Enemy(id, x, y, height, width, image) {
  var _id = id,
  _image = new Image(),
  _x = x,
  _y = y,
  _oldX = x,
  _oldY = y,
  _actInterval = 1000, // in ms
  _acted = Date.now();

  _image.src = image;

  return {
    draw: function (cxt) {
      drawEnemy(cxt, _image, _x, _y, height, width);
    },

    collide: function (actor) {
      return defaultCollision(this, actor);
    },

    rewind: function () {
      _x = _oldX;
      _y = _oldY;
    },

    act: function (time) {
      if ((time - _acted) < _actInterval) {
        return;
      }
      _acted = time;
      _oldX = _x;
      _oldY = _y;
      switch (randomDirection()) {
        case -1:
          break;

        case 0:
          _y = _y + 1;
        break;

        case 1:
          _x = _x + 1;
        break;

        case 2:
          _y = _y - 1;
        break;

        case 3:
          _x = _x - 1;
        break;
      }
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

