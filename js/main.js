require(["jquery-1.8.3.min", "underscore-min", "sprite_cache"], function ($, _, sprites) {

require(['sprite_cache']);
  // need to make modules/clean up dependencies
  require(["actors/actor"]);
  require(["actors/wall","actors/enemy","actors/player"]);

  // TODO relatedly, modulize these
  require(["log"]);
  require(["board"]);
  require(["run"]);
});
