// The Grid component allows an element to be located
//  on a grid of tiles
//
define(["Crafty", "src/globals"], function(Crafty, Globals) {
  Crafty.c('Grid', {
    init: function() {
      this.attr({
        w: Globals.map_grid.tile.width,
        h: Globals.map_grid.tile.height
      })
    },

    // Locate this entity at the given position on the grid
    at: function(x, y) {
      if (x === undefined && y === undefined) {
        return { x: this.x/Globals.map_grid.tile.width, y: this.y/Globals.map_grid.tile.height }
      } else {
        this.attr({ x: x * Globals.map_grid.tile.width, y: y * Globals.map_grid.tile.height });
        return this;
      }
    }
  });

  // An "Actor" is an entity that is drawn in 2D on canvas
  //  via our logical coordinate grid
  Crafty.c('Actor', {
    init: function() {
      this.requires('2D, Canvas, Grid');
    },
  });

  Crafty.c('Tree', {
    init: function() {
      this.requires('Actor, Color, Solid')
          .color('rgb(10, 100, 10)');
    }
  });

  Crafty.c('PlayerCharacter', {
    init: function() {
      this.requires('Actor, Keyboard, Fourway, Collision, spr_player, SpriteAnimation')
      // These next lines define our four animations
      //  each call to .animate specifies:
      //  - the name of the animation
      //  - the x and y coordinates within the sprite
      //     map at which the animation set begins
      //  - the number of animation frames *in addition to* the first one
      .fourway(2)
      .stopOnSolids()
      .animate('PlayerAttackDown',  3, 12, 7)
      .animate('PlayerMovingUp',  3, 26, 10)
      .animate('PlayerMovingDown', 3, 0, 10)
      .animate('PlayerMovingLeft',  3, 51, 10);

      this.attr({facing: { x: 0, y: 2 }});

      var animation_speed = 1;
      this.bind('NewDirection', function(data) {
        if (data.x > 0) {
          this.flip("X");
          this.animate('PlayerMovingLeft', animation_speed, -1);
          this.setFacing(data);
        } else if (data.x < 0) {
          this.unflip("X");
          this.animate('PlayerMovingLeft', animation_speed, -1);
          this.setFacing(data);
        } else if (data.y > 0) {
          this.animate('PlayerMovingDown', animation_speed, -1);
          this.setFacing(data);
        } else if (data.y < 0) {
          this.animate('PlayerMovingUp', animation_speed, -1);
          this.setFacing(data);
        } else {
          this.stop();
        }
      });

      this.bind('KeyDown', function () {
        if (this.isDown('SPACE'))
          this.attack();
      });
    },

    setFacing: function(data) {
      this.attr({facing: {x: data.x, y: data.y}});
      return this;
    },

    // Registers a stop-movement function to be called when
    //  this entity hits an entity with the "Solid" component
    stopOnSolids: function() {
      this.onHit('Solid', this.stopMovement);

      return this;
    },

    attack: function() {
      console.log("attack!");
      if (this.facing.x > 0) {
      } else if (this.facing.x < 0) {
      } else if (this.facing.y > 0) {
        this.animate('PlayerAttackDown', 10, 1);
      } else if (this.facing.y < 0) {
      } else {
        console.log("Not facing?");
        console.log(this.facing.x);
      }
    },

    // Stops the movement
    stopMovement: function() {
      this._speed = 0;
      if (this._movement) {
        this.x -= this._movement.x;
        this.y -= this._movement.y;
      }
    },
  });
});
