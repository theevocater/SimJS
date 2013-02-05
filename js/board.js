"use strict";

var board = (function () {
  var _canvas = null,
      _grid_height = 32,
      _grid_width = 32,
      _cols = 32,
      _rows = 20,
      _width = _grid_width * _cols + 0,
      _height = _grid_height * _rows + 0,
      _grid = [];

  function Tile(id, x, y, height, width, image) {
    var _image = new Image();

    _image.src = image;

    return {
      actor:  null, // keeps the actor currently at its locale
      draw: function (cxt) {
        cxt.drawImage(_image, x * height, y * width,
                      height, width);
                      if (this.actor !== null) {
                        this.actor.draw(cxt)
                      }
      },

      collide: function(actor) {
      },

      act: function (time, board) {
        return true;
      },
    }
  }

  return {
    grid_height: 32,
    grid_width: 32,
    actors: [],
    acted: [],
    player: null,

    // Must call init first or crashiness will follow
    init: function (canvas) {
      _canvas = canvas;
      _canvas.width = _width;
      _canvas.height = _height;

      var i,j;

      for (i = 0; i < _cols; i += 1) {
        _grid.push([]);
        for (j = 0; j < _rows; j += 1) {
          _grid[i].push(new Tile(newId(), i, j, _grid_height, _grid_width, "/sprites/tile.png"));
        }
      }

      this.redraw();
    },

    redraw: function () {
      var i, j,
          cxt = _canvas.getContext("2d");

      // clear screen
      cxt.fillStyle = "#FFFFFF";
      cxt.fillRect(0, 0, _width, _height);

      // draw every tile/actor
      for (i = 0; i < _cols; i += 1) {
        for (j = 0; j < _rows; j += 1) {
          _grid[i][j].draw(cxt);
        }
      }

      // draw grid
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

    drawLatest: function () {
      var cxt = _canvas.getContext("2d");
      if (this.acted.length > 0) {
        _.each(this.acted, function (element) {
          element.draw(cxt);
        });
        this.acted = [];
      }
    },

    // attempt to move actor to x,y
    move: function (actor, x, y) {
      var ax = actor.x(),
          ay = actor.y();

      // didn't move, so... yeah
      if (x === ax && y === ay)
        return true;

      // make sure its in bounds
      if (x < 0 || x >= _cols || y < 0 || y >= _rows)
        return false;

      // check collision
      // TODO still need to think this through, not sure if collisions should check
      // both ways, just one way in, hmmm
      // this doesn't work because this actor hasn't moved to that tile so it
      // doesn't yet occupy that space. hmmmmmmmmmmmmmmmmmmmmm
      // do we maybe just want to define a rock paper style collisions? like,
      // collide references some list of objects that it is blocked/will block
      // maybe? 
      if (_grid[x][y].actor != null) {// && actor.collide(_grid[x][y].actor)) {
        console.log(actor.id() + " collided with " + _grid[x][y].actor.id());
        return false;
      } else {
        // remove from old spot and redraw
        _grid[ax][ay].actor = null;
        this.acted.push(_grid[ax][ay]);

        // move to new spot and draw
        _grid[x][y].actor = actor;
        this.acted.push(_grid[x][y]);
        return true;
      }

      return false;
    },

    add: function(actor) {
      var x = actor.x(),
          y = actor.y();

      if (x < 0 || x >= _cols || y < 0 || y >= _rows)
        return false;

      this.actors.push(actor);
      _grid[x][y].actor = actor;
      this.acted.push(_grid[x][y]);
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

    // try to make all the actors act
    act: function (time) {
      _.each(this.actors, function (element) {
        var x = element.x(),
            y = element.y();
        element.act(time, this)
        log.log(element.id() + ": " + element.x() + " " + element.y());
      }, this);
    },
  };
}());

