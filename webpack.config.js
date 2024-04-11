const path = require('path')
// 帮你把项目中的index.html打包到dist目录进预览
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 清理dist目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 使用webpack内置的插件实现热更新
const webpack = require('webpack')
// 加载单文件vue组件
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// webpack的配置对象
module.exports = {
  // mode选项: 配置打包的模式
  // 模式1：production   生产模式：压缩资源，体积更小，加载速度更快，打包速度较慢。
  // 模式2：development   开发模式：不用压缩，打包速度较快。
  mode: 'development',

  // 入口
  entry: './src/main.js',

  // 出口
  output: {
    // 打包目录 绝对路径
    path: path.join(__dirname, './dist'),
    // 打包文件名称
    filename: 'bundle.js'
  },

  // 配置插件
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery" 
    }),
    new VueLoaderPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // 生成html的标题 会生产一个新的html  覆盖之前的内容
      // title: 'Output Management'
      template: './index.html'
    })
  ],

  // 配置开发时候的服务器
  devServer: {
    contentBase: './dist',
    hot: true
  },

  // 解析的配置
  resolve: {
    // 路径别名
    alias: {
      '@': path.join(__dirname, './src'),
      'scss_vars': '@/styles/vars.scss',
      'excel': path.resolve(__dirname, '../src/excel'), //文件路径（src下创建excel文件夹放置Blob.js和Export2Excel.js）
    },
    // 后缀名
    extensions: ['.js', '.vue', '.json'],

  },

  // 错误提示准确位置
  devtool: 'inline-source-map',

  // 配置加载器  加载其他类型的资源
  module: {
    loaders: [
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
    ],
    rules: [
      {
        // 匹配 .css 结尾的文件，使用以下加载器进行打包
        // css-loader 作用：把css文件的内容加载过来
        // style-loader 作用：把上一步加载的内容，追加到页面的head标签中的style里
        // 执行加载器：是从下往上执行
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        // 匹配 .less 结尾的文件，使用以下加载器进行打包
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  }
}
