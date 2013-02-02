"use strict";

// takes in grid relative coords
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

