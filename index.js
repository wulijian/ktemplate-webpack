var path = require("path");
var options = {};
function KtemplatePlugin(_options) {
    options = _options || {};
}
KtemplatePlugin.prototype.apply = function (compiler) {
    var templateDir = options.templateDir || 'src/template';
    compiler.plugin("normal-module-factory", function (nmf) {
        nmf.plugin("before-resolve", function (data, callback) {
            if (data.request.indexOf('.kt') > -1 || data.request.indexOf('.nkt') > -1) {
                var request = data.request;
                var loader = data.request.indexOf('.kt') > -1 ? 'kt-loader' : 'babel-loader!kt-loader';
                var loaderAndName = request.replace(/\.kt$|\.nkt$/, '');
                data.request = loader + '?' + templateDir + '!' + path.join(process.cwd(), templateDir + '/' + loaderAndName);
            }
            return callback(null, data);
        });
    });
};

module.exports = KtemplatePlugin;