'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var fs = require('fs');
var path = require('path');
var minify = require('html-minifier').minify;

const PLUGIN_NAME = 'gulp-test';

//匹配<require xxx>格式，然后获取对应HTML模块来替换
var getHtml = function(content) {
    //var regexp = 
    if(!content.match(/<require\s[a-zA-Z]*>/ig)) {
        throw new PluginError(PLUGIN_NAME, '引入的HTML模块名字只能由字母组成！');
        return;
    }
    return content.replace(/<require\s[a-zA-Z]*>/ig, function(item) {
        var requireHtml = item.slice(9,-1);
        var htmlPath = "./html-module/"+requireHtml+".html";
        if (!fs.existsSync(htmlPath)) {
            throw new PluginError(PLUGIN_NAME, htmlPath + '模块在html-module文件夹里没有找到！');
        }
        return String(fs.readFileSync(htmlPath));
    });
};

// function for gulp plugin
var gulpHtmlImport = function(opt) {
    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            // return null file
            cb(null, file);
        }
        else if (file.isBuffer()) {
            //获取gulp传进来的文件buffer，然后转换成字符串方便后面正则匹配
            var content = String(file.contents);
            content = getHtml(content);
            file.contents = new Buffer(content);
        }
        else if (file.isStream()) {
            throw new PluginError(PLUGIN_NAME, 'does not support stream');
        }

        cb(null, file);
    });
};

// 导出给gulpfile用
module.exports = gulpHtmlImport;