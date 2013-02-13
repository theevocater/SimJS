"use strict";

// no protected inheritance :(
function Actor(id) {
  var _id = id;
  // TODO move x/y/image up here. something all "actors" will have

  return {
    draw: function (cxt) {
    },

    collide: function (actor) {
      return a != b && a.x() === b.x() && a.y() === b.y();
    },

    // not sure about passing in the board, but such is the way
    act: function (time, board) {
      return true;
    },

    id: function () {
      return _id;
    },

    compose: function (literal) {
      var i;
      for (i in literal) {
        this[i] = literal[i];
      }
      return this;
    },
  };
}

