const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    entry: { // Chemin du point d'entrée
        'card' : './src/js/indexfutcard.js',
        'home' : './src/js/index.js',
    },
    output: {
        filename: '[name].js',  // Nom du fichier de sortie
        path: path.resolve(__dirname, 'dist'),  // Chemin du dossier de sortie
        publicPath : 'auto'
    },
    devServer: {
        static: './dist',
        hot: true,
        compress: true,
        historyApiFallback: {
            index: 'index.html',
            rewrites: [
                {from: /^\/card/, to: '/futcard.html'}
            ],
        },
    },
    resolve: {
        fallback: {
            stream: require.resolve('stream-browserify')
        }
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    // ...The other file-loader and extract-loader go here.
                    {
                        loader: 'html-loader',
                        options: {
                            sources: {
                                list: [
                                    {tag: 'img', attribute: 'src', type: 'src'},
                                ],
                            },
                        },
                    }
                ]
            },
            {
                test: /\.rdf$/,
                use: [
                    // ...The other file-loader and extract-loader go here.
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[sha512:hash:base64:7].[ext]',
                            outputPath: 'assets/files/'
                        },
                    }
                ]
            },
            {
                test: /\.js$/,  // Regex pour identifier les fichiers JS
                exclude: /node_modules/,  // Exclusion des fichiers du dossier node_modules
                use: {
                    loader: 'babel-loader',  // Utilisation de babel-loader pour transpiler le code
                },
            },
            {
                test: /\.css$/,  // Regex pour identifier les fichiers CSS
                include: path.resolve(__dirname, 'src/stylesheets'),
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(otf|eot|svg|ttf|woff|woff2)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[sha512:hash:base64:7].[ext]',
                        outputPath: 'assets/fonts/'
                    }
                }]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Irfan',
            chunks: ['home'],
            template: './src/html/index.tpl.html',
            filename: "index.html"
        }),
        new HtmlWebpackPlugin
        ({
            title: 'Carte',
            chunks: ['card'],
            template: './src/html/futcard.tpl.html',
            filename: "futcard.html"
        }),
        /*new CleanWebpackPlugin(),*/
        new MiniCssExtractPlugin()
    ],
};