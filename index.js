var path = require("path");
function KtemplatePlugin(options) {
}
KtemplatePlugin.prototype.apply = function (compiler) {
    compiler.plugin("normal-module-factory", function (nmf) {
        nmf.plugin("before-resolve", function (data, callback) {
            if (data.request.indexOf('.kt') > -1 || data.request.indexOf('.nkt') > -1) {
                var request = data.request;
                var loader = data.request.indexOf('.kt') > -1 ? 'kt!' : 'babel!kt!';
                var loaderAndName = request.replace(/\.kt$|\.nkt$/, '');
                data.request = loader + path.join(process.cwd(), './src/template/' + loaderAndName);
            }
            return callback(null, data);
        });
    });
};

module.exports = KtemplatePlugin;