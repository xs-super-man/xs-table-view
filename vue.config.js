// const { defineConfig } = require('@vue/cli-service')

// var webpack=require('webpack')
const ESLintPlugin = require('eslint-webpack-plugin')
module.exports = {
  transpileDependencies: true,
  
  configureWebpack: {
    plugins: [new ESLintPlugin({
      extensions: ['.js', '.jsx'] // 不加 .jsx 就不会检查 jsx 文件了
    })],
}
}
