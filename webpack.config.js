var webpack = require('webpack')
var path = require('path')
var glob = require('glob')

// if you don't want to inject inline stylesheet in file, so extract it
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// remove unuse css
var PurifyCSSPlugin = require('purifycss-webpack')

const CleanWebpackPlugin = require('clean-webpack-plugin')

var isProduction = (process.env.NODE_ENV === 'production')

// your own webpack plugins
var BuildManifestPlugin = require('./build/plugins/BuildManifestPlugin')

module.exports = {
    // entry: './src/app.js',
    entry: {    // entry point also be an object
        app: './src/app.js',
        vendor: ['jquery'],
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[chunkhash].js' // "bundle.js" or "[name].js", long term cacheing [name].[chunkhash].js
    },

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                // use: ['style-loader', 'css-loader', 'sass-loader'],
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            },

            {
                test: /\.css$/,
                // use: 'css-loader', // [] right -> left
                use: ['style-loader', 'css-loader'],
            },

            {
                test: /\.(svg|eot|ttf|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[hash].[ext]'
                }
            },

            {
                test: /\.(png|jpe?g|gif)$/,
                // use: 'file-loader'

                // 使用单个 loader
                // loader: 'file-loader',
                // options: {
                //     name: 'images/[name].[hash].[ext]'
                // }

                // 当你使用多个 loaders 的时候
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[hash].[ext]'
                        }
                    },

                    'img-loader'
                ]
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
        ]
    },

    plugins: [
        // new webpack.optimize.UglifyJsPlugin() // only in production mode

        new ExtractTextPlugin('[name].css'), // "style.css" or using "[name].css"

        new webpack.LoaderOptionsPlugin({
            minimize: isProduction
        }),

        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'index.html')),
            minimize: isProduction
        }),

        new CleanWebpackPlugin(['dist'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),

        // place function here, webpack will run
        // function () {
        //     this.plugin('done', stats => {
        //         require('fs').writeFileSync(
        //             path.join(__dirname, 'dist/manifest.json'),
        //             JSON.stringify(stats.toJson().assetsByChunkName)
        //         );
        //     })
        // }

        // build your own webpack plugin
        new BuildManifestPlugin()
    ]
}

// package.json ==> scripts ==> "production": "NODE_ENV=production webpack",
if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    )
}