const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: __dirname,
    mode: "development",
    // 指定入口文件
    entry: {
        // 文件名：地址描述
        app: path.resolve(__dirname, 'src/Main.ts')
    },
    //监听设置
    watchOptions: {
        ignored: ['/**/*.js', 'node_modules']
    },
    //依赖设置
    optimization: {
        //依赖拆分设置
        splitChunks: {
            //拆分模式设置
            chunks: 'all',
            //拆分后文件名设置
            name: "vendors"
        }
    },
    //插件设置
    plugins: [
        //删除编译后旧资源插件
        new CleanWebpackPlugin(),
        //自动导入编译后js文件插件
        new HtmlWebpackPlugin({title: "替换index.html"}),
        //拷贝插件
        new CopyWebpackPlugin({patterns: [{from:"src/assets",to:"assets"}]})
    ],
    // 模块设置
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    //资源搜索设置
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    //输出设置
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].bundle.js'
    },
    //服务器设置
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: false,
        port: 9000,
        open: true
    }
};