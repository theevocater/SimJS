"use strict";

var sprites = (function () {
  var images = {
    enemy: ["/sprites/cats.png"],
    player: ["/sprites/redoctober0.png", "/sprites/redoctober1.png"],
    wall: ["/sprites/tile.png"],
  };

  _.each(images, function (arr, key, obj) {
    obj[key] = _.map(arr, function (string, index) {
      var img = new Image();
      img.src = string;
      return img;
    });
  });
  console.log(images);

  return images;
}());
