desc("build");
task("build", function() {
    jake.exec("tsc");
    jake.exec("node hersite/hersite.js");
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


desc("sample");
task("sample", function() {
    jake.exec("tsc");
    jake.exec("cd sample && node ../bin/hersite build");
});
