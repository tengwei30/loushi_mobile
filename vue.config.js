/**
 * vue.config.js 配置参考
 * https://cli.vuejs.org/zh/config
 */
const path = require('path')
const getEntry = require('./build/pageEntry')
const resolve = dir => path.join(__dirname, dir)

const isProd = process.env.VUE_APP_DEVELOP_ENV === 'false'
const isDev = process.env.VUE_APP_DEVELOP_ENV === 'true'

// CDN 地址
const bkReadCDN = ''

let globMatch = '*'
if (!isProd && process.env.BK_H5_PAGES) {
  globMatch = process.env.BK_H5_PAGES
}

const pagesMaker = () => {
  let pagesObj = {}
  let pages = getEntry(`src/features/${globMatch}/index.pug`)
  for (let pathname in pages) {
    let pathInfo = pages[pathname]
    const folderName = pathInfo.split('/').splice(-2)[0]
    const fileName = `${folderName}.html`
    const filePrefix = 'BKH5-'
    let conf = {
      template: pathInfo,
      filename: `${filePrefix}${fileName}`,
      entry: `src/features/${pathname}/index.js`,
      chunks: ['chunk-vendors', 'chunk-common', pathname],
    }
    pagesObj[folderName] = conf
  }
  return pagesObj
}
const pages = pagesMaker()
module.exports = {
  publicPath: isDev ? '/' : bkReadCDN,
  assetsDir: 'bkh5-static',
  indexPath: 'index.html',
  pages,
  lintOnSave: isDev ? 'error' : true,
  // https://cli.vuejs.org/zh/config/#lintonsave
  runtimeCompiler: true,
  // 是否使用包含运行时编译器的 Vue 构建版本。https://cli.vuejs.org/zh/config/#runtimecompiler
  productionSourceMap: isDev,
  configureWebpack: config => {
    const newRules = config.module.rules.map(rule => {
      if (rule.test.test('.pug') === false) {
        return rule
      } else {
        return {
          test: /\.pug$/,
          oneOf: [
            // 这条规则应用到 Vue 组件内的 `<template lang="pug">`
            {
              resourceQuery: /^\?vue/,
              use: [
                {
                  loader: 'pug-plain-loader',
                },
              ],
            },
            // 这条规则应用到 JavaScript 内的 pug 导入
            {
              use: [
                {
                  loader: 'raw-loader',
                },
                {
                  loader: 'pug-plain-loader',
                },
              ],
            },
          ],
        }
      }
    })
    config.module.rules = newRules
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
    config.plugin('copy').tap(args => {
      const { toType, ignore } = args[0][0]
      args[0] = []
      args[0].push(
        {
          from: resolve('public'),
          to: resolve('dist/bkh5-static/js'),
          toType,
          ignore,
        },
        {
          from: resolve('static'),
          to: resolve('dist/bkh5-static/others'),
          toType,
        }
      )
      return args
    })
    // config.plugin('analyzer').use(BundleAnalyzerPlugin)
  },
  devServer: {
    open: true,
    hotOnly: true,
    host: '0.0.0.0',
    port: '8000',
    // proxy: {
    //   '*': {
    //     target: 'http://testapi.ibreader.com/',
    //     ws: true,
    //     changeOrigin: true,
    //   },
    // },
  },
}
