desc("build");
task("build", function() {
    jake.exec("tsc");
    jake.exec("cd example && node ../bin/hersite build");
});


desc("clean");
task("clean", function() {
  var list = new jake.FileList();

  list.include("./src/**/*.js");
  list.include("./lib/**/*.js");

  list.toArray().map(function(path) {
    jake.rmRf(path);
  });
});
