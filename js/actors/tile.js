"use strict";

// takes in grid relative coords
function Tile(x, y, width, height) {
  this.x = x;
  this.y = y;

  this.draw = function (cxt) {
    cxt.strokeStyle = "#000000";
    cxt.beginPath();
    cxt.moveTo(x*width, y*height);
    cxt.lineTo((x+1)*width, y*height);
    cxt.lineTo((x+1)*width, (y+1)*height);
    cxt.lineTo(x*width, (y+1)*height);
    cxt.lineTo(x*width, y*height);
    cxt.closePath();
    cxt.stroke();
  };

  this.act = function () {

  };
}

