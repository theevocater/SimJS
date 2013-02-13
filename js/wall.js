"use strict";

define(["actor"], function (Actor) {
  var Wall = Actor.extend({
    init: function (id, x, y, width, height, color) {
      this._super(id, x, y, height, width, null);
      this.color = color || "#000000";
    },

    draw: function (cxt) {
      cxt.fillStyle = this.color;
      cxt.fillRect(this.x * width, this.y * height, width, height);
    },
  });

  return Wall;
});

