"use strict";

define(["actor"], function (Actor) {
  var Player = Actor.extend({
    init: function (id, x, y, height, width, image) {
      this._super(id, x, y, height, width, image);
    },

    // the player doesn't take automatic actions
    // TODO this should remove one from queue, try to do it
    // maybe it should dump queue if its illegal?
    //act: function (time, board) {
    //return true;
    //},

    move: function (x, y) {
      if (board.move(this, x, y)) {
        this.x = x;
        this.y = y;
      }
    },

    // TODO this should queue actions
    left: function () {
      this.move(this.x - 1, this.y);
    },

    right: function () {
      this.move(this.x + 1, this.y);
    },

    up: function () {
      this.move(this.x, this.y - 1);
    },

    down: function () {
      this.move(this.x, this.y + 1);
    },
  });

  return Player;
});


