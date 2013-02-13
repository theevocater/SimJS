"use strict";

define(["actor"], function (Actor) {
  // @returns [-1,4] -- [NoMove, N, E, S, W]
  function randomDirection() {
    return Math.floor(Math.random() * 5) - 1;
  }

  var Enemy = Actor.extend({
    init: function (id, x, y, height, width) {
      this._super(id, x, y, height, width, sprites.enemy[0]);

      this.actInterval = 1000; // in ms
      this.acted = Date.now();
    },

    act: function (time, board) {
      // save the old position
      var x = this.x,
      y = this.y;

      // check if its time to move
      if ((time - this.acted) < this.actInterval) {
        return;
      }

      this.acted = time;

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
        this.x = x;
        this.y = y;
      }
    },
  });

  return Enemy;
});

