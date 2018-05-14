const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, 'src')
    },
    devtool: 'eval',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'app'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },
    devServer: {
        host: '0.0.0.0',
        port: 3333,
        hot: true,
        inline: true,
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
        compress: true,
        open: false
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};
