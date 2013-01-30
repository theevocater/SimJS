"use strict";

function Board(canvas) {
  var _canvas = canvas || console.log("warn: unable to init canvas"),
      _grid_height = 32,
      _grid_width = 32,
      _cols = 32,
      _rows = 20,
      _width = _grid_width * _cols + 0,
      _height = _grid_height * _rows + 0,
      _grid = [];

  _canvas.width = _width;
  _canvas.height = _height;

  var i,j;

  for (i = 0; i < _cols; i += 1) {
    _grid.push([]);
    for (j = 0; j < _rows; j += 1) {
      _grid[i].push(new Tile(newId(), i, j, _grid_height, _grid_width, "/sprites/tile.png"));
    }
  }

  return {
    grid_height: 32,
    grid_width: 32,
    actors: [],
    player: null,

    clear: function (cxt) {
      cxt = cxt || _canvas.getContext("2d");
      cxt.fillStyle = "#FFFFFF";
      cxt.fillRect(0, 0, _width, _height);
    },

    drawGrid: function (cxt) {
      var i;
      cxt = cxt || _canvas.getContext("2d");
      for (i = 0; i < _cols; i += 1) {
        for (j = 0; j < _rows; j += 1) {
          _grid[i][j].draw(cxt);
        }
      }

      for (i = 0; i <= _cols; i += 1) {
        cxt.strokeStyle = "#000000";
        cxt.beginPath();
        cxt.moveTo(i * _grid_width, 0);
        cxt.lineTo(i * _grid_width, _height);
        cxt.closePath();
        cxt.stroke();
      }

      for (i = 0; i <= _rows; i += 1) {
        cxt.strokeStyle = "#000000";
        cxt.beginPath();
        cxt.moveTo(0, i * _grid_height);
        cxt.lineTo(_width, i * _grid_height);
        cxt.closePath();
        cxt.stroke();
      }
    },

    // TODO might need to make this create the actual objects? im not sure.
    // maybe add a createAt?
    move: function (actor) {
      var x = actor.x(),
          y = actor.y();

      if (x < 0 || x > _rows || y < 0 || y > _cols)
        return false;

      _grid[x][y].actor = actor;
      return true;
    },

    add: function(actor) {
      var x = actor.x(),
          y = actor.y();

      if ( x < 0 || x > _rows || y < 0 || y > _cols )
        return false;

      this.actors.push(actor);
      _grid[x][y].actor = actor;
      return true;
    }, 

    get: function(x, y) {
      return _grid[x][y].actor;
    },

    pause: function () {
      var cxt = _canvas.getContext("2d");
      cxt.fillStyle = "#000000";
      cxt.fillRect(_width / 4.0, _height / 4.0, _width / 6.0, _height / 2.0);
      cxt.fillRect(7.0 * _width / 12.0, _height / 4.0, _width / 6.0, _height / 2.0);
    },

    getContext: function () {
      return _canvas.getContext("2d");
    },
  };
}

