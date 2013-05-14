"use strict";

define(["Crafty", "src/globals", "src/components", "src/scene"], function(Crafty, Globals) {
  var Game = {
    // Initialize and start our game
    start: function() {
      // Start crafty and set a background color so that we can see it's working
      Crafty.init(Globals.width(), Globals.height());
      Crafty.background('rgb(120, 100, 10');

      // Simply start the "Loading" scene to get things going
      Crafty.scene('Loading');
    }
  };

  return Game;
});
