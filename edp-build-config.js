/**
 * @file build配置
 * @author edpx-mobile
 */

var cwd = process.cwd();
var path = require('path');

// 引入 rider 支持
var epr = require('./edp-rider-config');

/**
 * 指定匹配版本的 stylus
 */
exports.stylus = epr.stylus;

/**
 * 输入目录
 *
 * @type {string}
 */
exports.input = cwd;

/**
 * 输出目录
 *
 * @type {string}
 */
exports.output = path.resolve(cwd, 'output');

/**
 * 排除文件pattern列表
 *
 * @type {Array}
 */
exports.exclude = [
    'tool',
    'doc',
    'test',
    'module.conf',
    'dep/packages.manifest',
    'dep/*/*/test',
    'dep/*/*/doc',
    'dep/*/*/demo',
    'dep/*/*/tool',
    'dep/*/*/*.md',
    'dep/*/*/package.json',
    'edp-*',
    'node_modules',
    '.edpproj',
    '.svn',
    '.git',
    '.gitignore',
    '.idea',
    '.project',
    'Desktop.ini',
    'Thumbs.db',
    '.DS_Store',
    '*.tmp',
    '*.bak',
    '*.swp'
];

/**
 * 获取构建processors的方法
 *
 * @return {Array}
 */
exports.getProcessors = function () {
    var cssProcessor = new CssCompressor();
    var moduleProcessor = new ModuleCompiler();
    var jsProcessor = new JsCompressor();
    var pathMapperProcessor = new PathMapper();
    var html2jsPorcessor = new Html2JsCompiler({
        extnames: 'tpl',
        combine: true
    });
    var html2jsClearPorcessor = new Html2JsCompiler({
        extnames: 'tpl',
        clean: true
    });
    var stylusProcessor = new StylusCompiler({
        stylus: epr.stylus,
        compileOptions: {
            use: epr.stylusPlugin
        }
    });
    // var addCopyright = new AddCopyright();

    return [
        stylusProcessor,
        cssProcessor,
        html2jsPorcessor,
        moduleProcessor,
        html2jsClearPorcessor,
        jsProcessor,
        pathMapperProcessor
    ];
};

exports.moduleEntries = 'html,htm,phtml,tpl,vm,js';
exports.pageEntries = 'html,htm,phtml,tpl,vm';

/**
 * builder主模块注入processor构造器的方法
 *
 * @param {Object} processors
 */
exports.injectProcessor = function (processors) {
    for (var key in processors) {
        global[key] = processors[key];
    }
};
