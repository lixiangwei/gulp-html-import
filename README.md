# gulp-html-import
主要用于学习gulp的工作原理
实现功能：导入公共HTML的插件
使用：下载该项目解压到node_module文件夹里面,文件夹名字这里叫html-import

HTML：
```
<body>
	<require header>
</body>
```

gulpfile：
```
var gulp = require('gulp');
var test = require('html-import');
gulp.task('html', function() {
    return gulp.src(['./*.html'])
               .pipe(test())
               .pipe(gulp.dest('./dist/'));
});
```

运行：
```
gulp html
```
