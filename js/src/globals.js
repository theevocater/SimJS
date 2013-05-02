"use strict";

define(function() {
  return {
    map_grid: {
      width:  32,
      height: 20,
      tile: {
        width:  28,
        height: 28 
      }
    },

    // The total width of the game screen. Since our grid takes up the entire screen
    //  this is just the width of a tile times the width of the grid
    width: function() {
      return this.map_grid.width * this.map_grid.tile.width;
    },

    // The total height of the game screen. Since our grid takes up the entire screen
    //  this is just the height of a tile times the height of the grid
    height: function() {
      return this.map_grid.height * this.map_grid.tile.height;
    },
  };
});
