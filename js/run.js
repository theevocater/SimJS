"use strict";

// globals
var time = 0;

var running = true;

// yeah.
var superUniqueUUID = 0;

function newId() {
  var id = superUniqueUUID;
  superUniqueUUID += 1;
  return id;
}

function pause() {
  if (running) {
    running = false;
    $("#pause").attr("value", "Play");
    board.pause();
  } else {
    running = true;
    $("#pause").attr("value", "Pause");
    run();
  }
}

function run() {
  var i, currTime;

  if (!running) {
    return;
  }

  log.clearLog();
  board.drawLatest();

  currTime = Date.now();
  board.act(currTime);
  time = Date.now();

  setTimeout(run, 16);
}

function start() {
  if (!running) {
    running = true;
    run();
  }
}

// TODO: push conversions into the board class
function canvasClick(e) {
  var x = Math.floor((e.pageX - this.offsetLeft) / board.grid_width);
  var y = Math.floor((e.pageY - this.offsetTop) / board.grid_height);
  add(x, y);
}

var adder = null;

// TODO: use board.put()
function addEnemy(e) {
  adder = function (id, x, y) {
    return new Enemy(id, x, y,
                     board.grid_height, board.grid_width,
                     "/sprites/cats.png");
  }
}

function addWall(e) {
  adder = function (id, x, y) {
    return new Wall(id, x, y, board.grid_width, board.grid_height);
  }
}

function add(x, y) {
  board.add(adder(newId(), x, y));

  _.last(board.actors).draw(board.getContext());

  // if we added our first actor, unpause
  if (board.actors.length === 1) {
    pause();
  }
}

// TODO this is broken
function clear() {
  board.clear();
  log.clearLog();
}

function moved() {
  if(detectCollision(board.player)) {
    board.player.rewind();
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
  board.init($("#myCanvas")[0]);

  var num = Math.floor(Math.random() * 2);

  board.player = new Player(newId(), 0, 0,
                      board.grid_height, board.grid_width,
                      "/sprites/redoctober" + num + ".png");
  // TODO: make sure its not rejected
  board.add(board.player);

  require(["keyboardjs/keyboard"], function (KeyboardJS) {
    KeyboardJS.on("w", function () {
      board.player.up();
      moved();
    });

    KeyboardJS.on("s", function () {
      board.player.down();
      moved();
    });

    KeyboardJS.on("a", function () {
      board.player.left();
      moved();
    });

    KeyboardJS.on("d", function () {
      board.player.right();
      moved();
    });
  });
  // TODO if no log element, replace with donothing logger
  log.init($("#log"));

  // start simulation
  run();
});

// TODO exception function
