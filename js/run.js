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
  // need to blow up here.
  this.canvas = canvas || console.log("warn: unable to init canvas");
  this.grid_height = 64;
  this.grid_width = 64;
  this.cols = 16;
  this.rows = 10;
  this.width = this.grid_width * this.cols + 0;
  this.height = this.grid_height * this.rows + 0;
  this.canvas.width = this.width;
  this.canvas.height = this.height;
  this.clear = function (cxt) {
    cxt = cxt || screen.canvas.getContext("2d");
    cxt.fillStyle = "#FFFFFF";
    cxt.fillRect(0, 0, this.width, this.height);
  };

  this.grid = function (cxt) {
    var i;
    cxt = cxt || screen.canvas.getContext("2d");
    for (i = 0; i <= this.cols; i += 1) {
      cxt.strokeStyle = "#000000";
      cxt.beginPath();
      cxt.moveTo(i * this.grid_width, 0);
      cxt.lineTo(i * this.grid_width, this.height);
      cxt.closePath();
      cxt.stroke();
    }

    for (i = 0; i <= this.rows; i += 1) {
      cxt.strokeStyle = "#000000";
      cxt.beginPath();
      cxt.moveTo(0, i * this.grid_height);
      cxt.lineTo(this.width, i * this.grid_height);
      cxt.closePath();
      cxt.stroke();
    }
  };

  this.pause = function () {
    var cxt = screen.canvas.getContext("2d");
    cxt.fillStyle = "#000000";
    cxt.fillRect(screen.width / 4.0, screen.height / 4.0, screen.width / 6.0, screen.height / 2.0);
    cxt.fillRect(7.0 * screen.width / 12.0, screen.height / 4.0, screen.width / 6.0, screen.height / 2.0);
  };

  this.getContext = function () {
    return screen.canvas.getContext("2d");
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
      console.log(element.id + " collided with " + other.id);
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
  screen.grid(cxt);
  if (actors.length === 0) {
    pause();
    return;
  }

  _.each(actors, function (element) {
    element.draw(cxt);
    log.log(element.id + ": " + element.x + " " + element.y);
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

function canvasClick(e) {
  var x = Math.floor((e.pageX - this.offsetLeft) / screen.grid_width);
  var y = Math.floor((e.pageY - this.offsetTop) / screen.grid_height);
  add(x, y);
}

var adder = null;

function addBall(e) {
  adder = function (id, x, y) {
    return new Ball(id, x, y, screen.grid_height / 2);
  }
}

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
  $("#add_ball").click(addBall);
  $("#add_wall").click(addWall);
  // set up default to addBall
  addBall();
  $("#clear").click(clear);
  $("canvas").click(canvasClick);

  // set up game world
  screen = new Screen($("#myCanvas")[0]);
  walls = new SimWalls(newId());

  player = new Player(newId(), 0, 0, screen.grid_height / 2, "black");
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
