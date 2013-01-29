"use strict";

// takes in grid relative coords
function Tile(id, x, y, height, width, image) {
  var _image = new Image(),
      _actor = null; // keeps the actor currently at its locale

  _image.src = image;

  return {
    draw: function (cxt) {
      cxt.drawImage(_image, x * height, y * width,
                    height, width);
    },

    rewind: function () {
    },

    collide: function(actor) {
    },

    act: function (time) {
    },
  }
}

