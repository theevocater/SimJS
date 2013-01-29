"use strict";

// @returns [-1,4] -- [NoMove, N, E, S, W]
function randomDirection() {
  return Math.floor(Math.random() * 5) - 1;
}

// TODO: move this to another file
// possibly add to prototype of 2d context?
function drawCircle(cxt, x, y, radius, color) {
  cxt.fillStyle = color;
  cxt.beginPath();
  // a circle is an arc from 0 to 2Pi
  cxt.arc(x * radius * 2 + radius,
          y * radius * 2 + radius,
          radius, 0, Math.PI * 2, true);

          cxt.closePath();
          cxt.fill();
}

function Ball(id, x, y, radius, color) {
  var _id = id,
      _radius = radius || 16,
      _x = x,
      _y = y,
      _oldX = x,
      _oldY = y,
      _actInterval = 1000, // in ms
      _acted = Date.now(),
      _color = color || "#000000";

  if (_x < 0) {
    _x = 0;
  }

  if (_x > screen.cols) {
    _x = screen.cols;
  }

  if (_y < 0) {
    _y = 0;
  }
  if (_y > screen.rows) {
    _y = screen.rows;
  }

  return {
    draw: function (cxt) {
      drawCircle(cxt, _x, _y, _radius, _color);
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

