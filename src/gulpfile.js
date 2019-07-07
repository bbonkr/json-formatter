const {src, dest, parallel} = require('gulp');

function copyJs(){
    // copy javascript files 
    return src('dist/*').pipe(dest('../docs/dist/'));    
}

function copyHtml(){
    // copy a html file.
    return src('index.html').pipe(dest('../docs/'));
}

exports.default = parallel(copyJs, copyHtml);