require(["jquery-1.8.3.min", "underscore-min"], function ($, _) {

  // need to make modules/clean up dependencies
  // TODO probably move these into an "actors" file and declare each one
  // separately? I think that is correct?
  require(["actors/actor"]);
  require(["actors/wall","actors/enemy","actors/player"]);

  // TODO relatedly, modulize these
  require(["log"]);
  require(["board"]);
  require(["run"]);
});
