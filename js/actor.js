"use strict";

define(["lib/class"], function (Class) {

  var Actor = Class.extend({
    init: function (id, x, y, height, width, image) {
      this.id = id;
      this.x = x;
      this.y = y;
      this.height = height;
      this.width = width;
      this.image = image;
    },

    draw: function (cxt) {
      cxt.drawImage(this.image, this.x * this.height, this.y * this.width, this.height, this.width);
    },

    collide: function (actor) {
      return this.id !== actor.id && this.x === actor.x && this.y === actor.y;
    },

    // not sure about passing in the board, but such is the way
    act: function (time, board) {
      return true;
    },
  });

  return Actor;
});

