import gulp from "gulp";
import webpack from "webpack";
import {log} from "gulp-util";
import del from "del";
import WebpackConfig from "./webpack.config.production";
import browserSync from "browser-sync";

const static_server = browserSync.create();
const port = 3000;

const dest = "./dist/";
const html_src = ["./src/index.html"];
const js_src = ["./src/**/*.js"];

gulp.task("build:html", () =>
  gulp.src(html_src).pipe(gulp.dest(dest))
);

gulp.task("build:js", (done) => {
  const config =  WebpackConfig;
  webpack(config).run((err, stats) => {
    err && log(err);
    stats && log(stats.toString({colors: true}));
    done && done();
  });
});

gulp.task("build:all", gulp.series(
  (done) => {
    del(dest);
    done();
  },
  gulp.parallel("build:html", "build:js"))
);

gulp.task("watch:build", gulp.series(
  "build:all",
  gulp.parallel(
    () => {gulp.watch(js_src, gulp.series("build:all"));},
    () => {gulp.watch(html_src, gulp.series("build:all"));}
  )
));

gulp.task("server", function(){
  static_server.init({
    server: {
      baseDir: "./dist",
      index: "index.html",
      port,
      files: js_src.concat(html_src)
    }
  });
});

gulp.task("default", gulp.parallel("watch:build", "server"));
