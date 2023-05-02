import path from 'path';
import {getDirPath} from './service.js';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';

const url = import.meta.url
const __dirname = getDirPath(url)

const config = (env, args) => {
  const isProd = args.mode === 'production'
  const isDev = !isProd
  const filename = ext => isProd ? `[name].[contenthash].${ext}`:`[name].bundle.${ext}`
  const plugins = () => {
    const base = [
      new HtmlWebpackPlugin({
        meta: {
          'viewport': 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
          'charset': 'UTF-8',
          'http-equiv': {
            'X-UA-Compatible': 'ie=edge'
          }
        },
        template: './index.html'
      }),
      new MiniCssExtractPlugin({
        filename: filename('css')
      }),
      new CleanWebpackPlugin()
    ]
    return base
  }
  return {
    target: 'web',
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: './index.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: filename('js')
    },
    devServer: {
      port: 3003,
      open: true,
      hot: true,
      watchFiles: './',
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
