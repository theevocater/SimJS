"use strict";

define(["Crafty", "src/globals"], function(Crafty, Globals) {
Crafty.scene('Game', function() {
  // A 2D array to keep track of all occupied tiles
  this.occupied = new Array(Globals.map_grid.width);
  for (var i = 0; i < Globals.map_grid.width; i++) {
    this.occupied[i] = new Array(Globals.map_grid.height);
    for (var y = 0; y < Globals.map_grid.height; y++) {
      this.occupied[i][y] = false;
    }
  }

  // Player character, placed at 5, 5 on our grid
  this.player = Crafty.e('PlayerCharacter').at(5, 5);
  this.occupied[this.player.at().x][this.player.at().y] = true;

  // Place a tree at every edge square on our grid of 16x16 tiles
  for (var x = 0; x < Globals.map_grid.width; x++) {
    for (var y = 0; y < Globals.map_grid.height; y++) {
      var at_edge = x == 0 || x == Globals.map_grid.width - 1 ||
                    y == 0 || y == Globals.map_grid.height - 1;

      if (at_edge) {
        // Place a tree entity at the current tile
        Crafty.e('Tree').at(x, y);
        this.occupied[x][y] = true;
      } else if (Math.random() < 0.06 && !this.occupied[x][y]) {
        //Crafty.e('Kitty').at(x, y);
        //this.occupied[x][y] = true;
      }
    }
  }
});


// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function(){
  // Draw some text for the player to see in case the file
  //  takes a noticeable amount of time to load
  Crafty.e('2D, DOM, Text')
    .text('Loading; please wait...')
    .attr({ x: 0, y: Globals.height()/2 - 24, w: Globals.width() });
    //.css($text_css);

  // Load our sprite map image
  Crafty.load([
    'assets/thelegendofzeldafourswords_link-green_sheet.png'
    ], function(){
    // Once the assets are loaded...

    // Define the individual sprites in the image
    // Each one (spr_tree, etc.) becomes a component
    // These components' names are prefixed with "spr_"
    //  to remind us that they simply cause the entity
    //  to be drawn with a certain sprite
    Crafty.sprite(28,
    'assets/thelegendofzeldafourswords_link-green_sheet.png',
    {
      spr_player:    [0, 0],
    }, 2, 2);

     //Define our sounds for later use
    //Crafty.audio.add({
      //knock:     ['assets/door_knock_3x.mp3',
                  //'assets/door_knock_3x.ogg',
                  //'assets/door_knock_3x.aac'],
      //applause:  ['assets/board_room_applause.mp3',
                  //'assets/board_room_applause.ogg',
                  //'assets/board_room_applause.aac'],
      //ring:      ['assets/candy_dish_lid.mp3',
                  //'assets/candy_dish_lid.ogg',
                  //'assets/candy_dish_lid.aac']
    //});

    // Now that our sprites are ready to draw, start the game
    Crafty.scene('Game');
  })
});

});

