import path from 'path'
import {getDirPath} from "./service.js";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
const url = import.meta.url

const __dirname = getDirPath( url )

export default {
    context: path.resolve(__dirname,'src'),
    entry: {
        main: './index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    resolve: {
      extensions: ['.js','.json'],
      alias: {
          '@': path.resolve(__dirname, 'src'),
          '@core': path.resolve(__dirname, 'src', 'core')
      }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/assets/icons/windows-icon.svg' ),
                to: path.resolve(__dirname, 'dist/assets/icons/' )
            }]
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.css'
        }),

    ],
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
