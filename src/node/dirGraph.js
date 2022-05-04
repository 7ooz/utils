/**
 * 根据项目目录结构，生成对应目录图
 */
var fs = require('fs');
var path = require('path');
function dfs(path, depth) {
    var dirs = fs.readdirSync(path);
    for (var _i = 0, dirs_1 = dirs; _i < dirs_1.length; _i++) {
        var dir = dirs_1[_i];
        if (dir === 'node_modules' || dir === '.git') {
            continue;
        }
        var stat = fs.statSync("".concat(path, "/").concat(dir));
        var prefix = '';
        for (var i = depth; i > 0; i--) {
            prefix += '    ';
        }
        prefix += '|——';
        if (stat.isDirectory()) {
            console.log("".concat(prefix).concat(dir));
            dfs("".concat(path, "/").concat(dir), depth + 1);
        }
        else {
            console.log("".concat(prefix).concat(dir));
        }
    }
}
function dirGraph() {
    var entry = process.argv[2] || './';
    dfs(entry, 0);
}
dirGraph();
