var url = require('url');
var fs = require('fs');
var path = require('path');

gulp = require('gulp');
livereload = require('gulp-livereload');
webserver = require('gulp-webserver');
cleanCSS = require('gulp-clean-css');
rename = require('gulp-rename'),
uglify = require('gulp-uglify'),

// gulp.task('hello', function() {
//   console.log('Hello World');
// });


//web服务器
/*gulp.task(name,fn):定义任务，name:任务名；fn任务内容；
gulp.src(file.src):选择文件，传入参数是文件路径；
gulp.dest(path):选择的输出文件放在哪个文件夹里面；
gulp.pipe():将操作加入执行队列中*/
gulp.task('webserver', function() {
    gulp.src('./project') // 服务器目录（./代表根目录）
    .pipe(webserver({ // 运行gulp-webserver
        port: 8000, //端口，默认8000
        host: '172.16.22.247',
        livereload: false, // 启用LiveReload,true
        open: true, // 服务器启动时自动打开网页
        directoryListing: {
            enable: true,
            path: './project'
        },
        middleware: function(req, res, next) {
            //mock local data
            var urlObj = url.parse(req.url, true),
                method = req.method;


            if (!urlObj.pathname.match(/^\/api/)) { //不是api开头的数据，直接next
                next();
                return;
            }
            var mockDataFile = path.join(__dirname, urlObj.pathname) + ".js";
            //file exist or not
            fs.access(mockDataFile, fs.F_OK, function(err) {
                if (err) {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({
                        "status": "没有找到此文件",
                        "notFound": mockDataFile
                    }));
                    return;
                }
                var data = fs.readFileSync(mockDataFile, 'utf-8');
                res.setHeader('Content-Type', 'application/json');
                res.end(data);
            });
            next();
        },
        proxies: []
    }));
});
/*压缩css*/
gulp.task('minifycss', function() {
    return gulp.src('./project/2017嘉兴科技贷/css/*.css')      //压缩的文件
    .pipe(rename({suffix:'.min'}))//重命名
    .pipe(cleanCSS({cpmpatibility:'ie7'}))//执行压缩
        .pipe(gulp.dest('./project/2017嘉兴科技贷/css/min/'))   //输出文件夹
});
/*压缩js*/
gulp.task('minifyjs', function() {
    return gulp.src('./project/2017嘉兴科技贷/js/*.js')      //压缩的文件
    .pipe(rename({suffix:'.min'}))//重命名
    .pipe(uglify())//执行压缩
        .pipe(gulp.dest('./project/2017嘉兴科技贷/js/min/'))   //输出文件夹
});
/*gulp.task('minifyjs',function(){
   return gulp.src('dist/js/*.js')
   .pipe(uglify())
   .pipe(gulp.dest('dist/min/'))   
})；*/

// 默认任务,
gulp.task('default', ['webserver'],function(){
    gulp.start('minifycss','minifyjs');
});