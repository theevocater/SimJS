"use strict";

define(function () {
  var images = {
      enemy: ["/sprites/cats.png"],
      player: ["/sprites/redoctober0.png", "/sprites/redoctober1.png"],
      wall: ["/sprites/tile.png"],
    },
    i;

  for (i in images) {
    images[i] = _.map(images[i], function (string) {
      var img = new Image();
      img.src = string;
      return img;
    });
  }

  return images;
});
