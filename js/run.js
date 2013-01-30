"use strict";

// globals
var screen = null;

var log = null;

// yeah.
var superUniqueUUID = 0;

function newId() {
  var id = superUniqueUUID;
  superUniqueUUID += 1;
  return id;
}

var actors = [];

var player = null;

var walls = null;

var running = true;

function Screen(canvas) {
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
    put: function (actor) {
      var x = actor.x(),
          y = actor.y();

      if (x < 0 || x > _rows || y < 0 || y > _cols)
        return false;

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

function pause() {
  if (running) {
    running = false;
    $("#pause").attr("value", "Play");
    screen.pause();
  } else {
    running = true;
    $("#pause").attr("value", "Pause");
    run();
  }
}

function detectCollision(element) {
  return _.reduce(actors, function (memo, other) {
    var collide = element.collide(other);
    if (collide) {
      console.log(element.id() + " collided with " + other.id());
    }
    return collide || memo;
  }, false);
}

var time = 0;

function run() {
  var i, cxt, currTime;
  if (!running) {
    return;
  }

  cxt = screen.getContext();
  log.clearLog();
  screen.clear(cxt);
  screen.drawGrid(cxt);
  if (actors.length === 0) {
    pause();
    return;
  }

  _.each(actors, function (element) {
    element.draw(cxt);
    log.log(element.id() + ": " + element.x() + " " + element.y());
  });

  currTime = Date.now();
  _.each(actors, function (element) {
    element.act(currTime);
    if (detectCollision(element)) {
      element.rewind();
    }
  });

  // check the walls now
  _.each(actors, function (element) {
    if (walls.collide(element)) {
      element.rewind()
    }
  });
  time = Date.now();

  // checking correctness
  //_.each(actors, function (element) {
    //if (Math.abs(element.x - element.oldX) > 1 || Math.abs(element.y - element.oldY) > 1) {
      //running = false;
      //console.log("x " + element.x);
      //console.log("y " + element.y);
      //console.log("oldX " + element.oldX);
      //console.log("oldY " + element.oldY);
    //}
  //});

  setTimeout(run, 16);
}

function start() {
  if (!running) {
    running = true;
    run();
  }
}

// TODO: push conversions into the screen class
function canvasClick(e) {
  var x = Math.floor((e.pageX - this.offsetLeft) / screen.grid_width);
  var y = Math.floor((e.pageY - this.offsetTop) / screen.grid_height);
  add(x, y);
}

var adder = null;

// TODO: use screen.put()
function addEnemy(e) {
  adder = function (id, x, y) {
    return new Enemy(id, x, y,
                     screen.grid_height, screen.grid_width,
                     "/sprites/cats.png");
  }
}

// TODO: remove this in favor of using screen.put()
function addWall(e) {
  adder = function (id, x, y) {
    return new Wall(id, x, y, screen.grid_width, screen.grid_height);
  }
}

function add(x, y) {
  actors.push(adder(newId(), x, y));

  if (detectCollision(_.last(actors))) {
    actors.pop();
    return;
  }

  _.last(actors).draw(screen.getContext());

  // if we added our first actor, unpause
  if (actors.length === 1) {
    pause();
  }
}

function clear() {
  actors = [player];
  log.clearLog();
}

function moved() {
  if(detectCollision(player) || walls.collide(player)) {
    player.rewind();
    return;
  }
}

$(document).ready(function () {
  // set up buttons
  $("#pause").click(pause);
  $("#add_enemy").click(addEnemy);
  $("#add_wall").click(addWall);
  // set up default to addEnemy
  addEnemy();
  $("#clear").click(clear);
  $("canvas").click(canvasClick);

  // set up game world
  screen = new Screen($("#myCanvas")[0]);
  walls = new SimWalls(newId());

  // TODO screen.put()
  var num = Math.floor(Math.random() * 2);
  player = new Player(newId(), 0, 0,
                      screen.grid_height, screen.grid_width,
                      "/sprites/redoctober" + num + ".png");
  actors.push(player);

  KeyboardJS.on("w", function () {
    player.up();
    moved();
  });

  KeyboardJS.on("s", function () {
    player.down();
    moved();
  });

  KeyboardJS.on("a", function () {
    player.left();
    moved();
  });

  KeyboardJS.on("d", function () {
    player.right();
    moved();
  });
  // TODO if no log element, replace with donothing logger
  log = new Log($("#log"));

  // start simulation
  run();
});

// TODO exception function
