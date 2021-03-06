## 介绍
本项目主要搭建一个项目 可以让项目跑起来
用到了react，react-dom，antd, babel,以及跑起来需要用到的一些loader等等
后边的文章会有怎么使用antd 路由跳转等等
## 项目结构
建立文件目录结构
````
-resource 
   -resources ：mxgraph部分的源代码
   -www : 主要用于editor部分源码
   -src ：业务逻辑，目前只将mxgraphEditor集成进来
   -stencil ：存放静态图标模板
````
## 初始化项目
在项目的根目录下打开命令行，输入：
````
npm init -y 项目初始化, 生成  `package.json` 文件 
````
## 安装webpack的包
````
npm i webpack webpack-cli webpack-command --save-dev
````
这里直接将webpack 的三个基本项安装好
##### --save-dev与--save的区别
`--save-dev`表示只是在编译过程中所依赖的包，例如：webpack、sass-loader等 最后在package.json的devDependencies部分显示
`--save` 表示编译后在运行时还需要依赖的包，例如 react react-dom等 最后在package.json的dependencies部分显示
##### 指定安装webpack的版本
````
npm install --save-dev webpack@[version] //version代表版本号
````
## webpack 服务器 webpack-dev-server,让启动更方便
````
npm i --save-dev webpack-dev-server
````

## 安装其他webpack的插件
### 自动创建html文件 html-webpack-plugin
````
npm i --save-dev  html-webpack-plugin
````
### 清除无用文件 clean-webpack-plugin,将每次打包多余的文件删除
````
npm i --save-dev clean-webpack-plugin
````
### 样式编译loader插件
````
npm i --save-dev style-loader css-loader  // css相关loader
npm i --save-dev node-sass sass-loader  // scss 相关loader
npm i --save-dev file-loader url-loader // 加载其他文件，比如图片，字体
````
## 根目录创建`webpack.config.js`文件,里面代码如下
````
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');//自动创建html文件
const CleanWebpackPlugin = require('clean-webpack-plugin');//清除多余文件

module.exports = {
    devtool: 'cheap-module-eval-source-map',// 用于开发调试，方便清楚是那个文件出错 (共有7种)
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: 'bundle.js', // 输出的文件名
        path: path.resolve(__dirname, 'dist') // 
    },
    module: {
        rules: [{
            //转换css文件
            test: /\.css$/,
            use:"style-loader!css-loader"
        }, {
            //转换scss文件
            test: /\.scss$/,
            use:["style-loader","css-loader","sass-loader"]
           // 加载时顺序从右向左 
        },
        {
            // 转换文件png|svg|jpg|gif
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader']
        }]
    },
    // 开启一个虚拟服务器
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        //每次编译都会把dist下的文件清除，我们可以在合适的时候打开这行代码，例如我们打包的时候，开发过程中这段代码关闭比较好
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            //使用一个模板
            template: 'src/index.html' 
        })
    ]
};
````
完善修改 package.json
````
"scripts": {
    "watch": "webpack --watch",
    "build": "webpack --mode production",
    "dev": "webpack  --mode development& webpack-dev-server --open  --mode development",
    "start": "webpack-dev-server --open --mode production"
  },
````
--open为自动打开浏览器

## 编写index.html文件
````
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
````
## src/index.js文件
````
console.log('hi')
````
## 运行
````
npm run dev
````
## 在项目中运用React
#### 安装react 的东西,以及antd
````
npm i --save react react-dom antd
````
## 安装一些babel
````
npm i --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react  @babel/plugin-proposal-class-properties
npm i --save @babel/polyfill
npm i --save-dev babel-loader
````
## 修改webpack.config.js配置
在rules中加入：
 ````
//这个是为了转换js
{
   test: /\.(js|jsx)$/,
   loader: 'babel-loader',
   exclude: /node_modules/
}
````
最终的配置文件完整代码为：
````
const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
// const nodeExternals = require('webpack-node-externals');
 module.exports = {
    devtool: 'inline-source-map',
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [{
            test: /\.css$/,
            loader:['style-loader', 'css-loader']
        }, {
            test: /\.scss$/,
            loader: ['style-loader', 'css-loader', 'sass-loader']
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: 'img/[name].[hash:7].[ext]'
            }
        }, {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    devServer: {
        contentBase: './build',
        port: 8081,
        inline: true,
        hot: true
    },
    // externals: [nodeExternals()],
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlPlugin({
            template: 'src/index.html'
        })
    ]
}
````
## 配置babel,在根目录下添加文件 `.babelrc`
文件里面完整代码为:
````
{
  "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
  ],
"plugins": [
      "@babel/plugin-proposal-class-properties",
        ]
}
 
