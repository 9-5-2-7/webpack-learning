let fs = require('fs')
let path = require('path')

function BuildManifestPlugin() {}

BuildManifestPlugin.prototype.apply = function (compiler) {
    // listen all webpack event
    console.log('YAY')

    compiler.plugin('emit', (compiler, callback) => {
        let manifest = JSON.stringify(compiler.getStats().toJson().assetsByChunkName)

        compiler.assets['manifest.json'] = {
            source: function() {
                return manifest
            },

            size: function() {
                return manifest.length
            }
        }

        callback()
    })

    // compiler.plugin('done', stats => {
    //     fs.writeFileSync(
    //         path.resolve('dist/manifest.json'),
    //         JSON.stringify(stats.toJson().assetsByChunkName)
    //     );
    // })
}

module.exports = BuildManifestPlugin