const {NODE_ENV} = process.env;
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: NODE_ENV,
  stats: {
    errorDetails: true
  },
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, '../WebApi/SneakerCheck.WebApi/wwwroot'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
        port: 8080,
        // contentBase: path.resolve(__dirname, './dist'),
        static: path.join(__dirname, 'public'),
        open: true,
        hot: true,
        compress: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        modules: [path.resolve(__dirname, 'node_modules')],
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    NODE_ENV === 'development'
                        ? 'style-loader'
                        : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    }
                ],
            },
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: [
                    NODE_ENV === 'development'
                        ? 'style-loader'
                        : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(svg|png|jpe?g|gif)(\?v=\d+\.\d+\.\d+)?$/,
                use:
                    [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[hash:8].[ext]',
                                outputPath: 'assets/',
                            },
                        },
                    ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                use:
                    [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'fonts/',
                            },
                        },
                    ],
            },
        ],
    },
    devtool: NODE_ENV === 'production' ? undefined : 'source-map',
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public' }
            ]
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:8].css',
            chunkFilename: '[name].[hash:8].css',
        })
        // new ESLintPlugin({
        //     // Параметры плагина
        //     extensions: ['js', 'jsx', 'ts', 'tsx'], // Расширения файлов для проверки
        // }),
    ],
}