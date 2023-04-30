import path from 'path'
import {getDirPath} from "./service.js";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {CleanWebpackPlugin} from "clean-webpack-plugin";
import ESLintWebpackPlugin from "eslint-webpack-plugin";

const url = import.meta.url
const __dirname = getDirPath(url)

const config = (env, args) => {
    const isProd = args.mode === 'production'
    const isDev = !isProd
    const filename = ext => isProd ? `[name].[contenthash].${ext}`:`[name].bundle.${ext}`
    const plugins = () => {
        const base = [
                new HtmlWebpackPlugin({
                    template: './index.html'
                }),
                new MiniCssExtractPlugin({
                    filename: filename('css')
                }),
                new CleanWebpackPlugin()
            ]
        if (isDev) {
            base.push( new ESLintWebpackPlugin() )
        }
        return base
    }
    return {
        context: path.resolve(__dirname, 'src'),
        entry: {
            main: './index.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: filename('js')
        },
        resolve: {
            extensions: ['.js', '.json'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@core': path.resolve(__dirname, 'src', 'core')
            }
        },
        plugins: plugins(),
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                }
            ]
        }
    }
}
export default config
