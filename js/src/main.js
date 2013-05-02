"use strict";

// this is not ideal, should be fixed up
require(["lib/jquery-1.8.3.min", "lib/underscore-min"], function ($, _) {
  require(["src/sprite_cache"], function (sprites) {
    require(["src/run"]);
  });
});
