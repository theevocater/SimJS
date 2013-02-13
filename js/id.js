"use strict";

define(function () {
  // yeah.
  var superUniqueUUID = -1;

  var newId = function () {
    var id = superUniqueUUID;
    superUniqueUUID += 1;
    return id;
  }

  return newId;
});
