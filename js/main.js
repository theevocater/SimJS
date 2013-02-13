"use strict";

// this is not ideal, should be fixed up
require(["jquery-1.8.3.min", "underscore-min"], function ($, _) {
  require(["sprite_cache"], function (sprites) {
    require(["run"]);
  });
});
