webpack src/app.js dist/bundle.js --watch

setting npm script
```js
...
"script": {
    "build: "webpack src/app.js dist/bundle.js",
    "watch": "webpack src/app.js dist/bundle.js --watch"
}
```

## "Modules are simply files" can expose anything to outside world
```js
    module.exports = function (message) {...}
    var notify = require('./Notification')

    
    export function notity () {...}
    export function log () {...}
    import { notify, log } from './Notification'


    export default function () {...}
    import notify from './Notification'


    function notify () {...}
    function log () {...}
    export default {
        notify,
        log
    }
    import notification from './Notification'
    notification.log()
    notification.notify()

```

**旧项目在处理CSS中 relative URL 时候需要注意** 

打包出来的是
    dist/logo.png

所以你在 src/app.sass 中
body {
    background: url('./logo.png')
}
这样会出错！记住 webpack 在读取你 app.sass 的时候，遇到 './' 时候会以你 app.sass 文件位置为准！

这种情况你可以
1. 使用 绝对路径 body { background: url('/logo.png') }. 但是很多项目并不允许你这么做
2. 禁用掉 css-loader 中 url 选项
```js
    rules: [
        {
            test: /\.s[ac]ss$/,
            use: ExtractTextPlugin.extract({
                // use: ['css-loader', 'sass-loader']

                // 变成
                use: [
                    {
                        loader: 'css-loader',
                        options: { url: false }
                    },

                    'sass-loader'
                ]
            })
        }
    ]
```
3. 使用 raw-loader. `use: ['raw-loader', 'sass-loader']`
4. 如果是新项目，把 images/ 放在 src 下 (方便你app.sass使用 相对路径来访问), 再使用 url-loader 或者 file-loader 来加载图片文件
```js
    ...
    {
        test: /\.png$/,
        // use: 'file-loader'
        loader: 'file-loader',
        options: {
            name: 'images/[name].[hash].[ext]'
        }
    },
    ...
```

### strip unused css

### long-term caching

### webpack manifests

### automatic image optimization

### developing webpack plugins