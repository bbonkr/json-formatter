/** 사용되지 않습니다. */
const { src, dest, parallel } = require("gulp");
const publishDirname = "publish";

function copyJs() {
  // copy javascript files
  return src("dist/*").pipe(dest(`./${publishDirname}/dist/`));
}

function copyHtml() {
  // copy a html file.
  return src(["index.html", "favicon.ico", "bbon-icon.png"]).pipe(
    dest(`../${publishDirname}/`)
  );
}

exports.default = parallel(copyJs, copyHtml);
