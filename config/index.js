// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8078,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/image-base':'http://192.168.0.9:8080',//图片
      '/fresh-order' : 'http://192.168.0.9:8080',//订单
      '/fresh-goods':'http://192.168.0.9:8080',//商品
      '/fresh-front':'http://192.168.0.9:8080',//首页
      '/fresh-voucher':'http://192.168.0.9:8080',//优惠券
      '/fresh-bills':'http://192.168.0.9:8080',//账单
      '/user-center':'http://192.168.0.9:8080',//用户中心
      '/fresh-order':'http://192.168.0.9:8080',
      '/fresh-member':'http://192.168.0.9:8080'

      // '/image-base':'http://192.168.0.111:9090',//图片
      // '/fresh-order' : 'http://192.168.0.111:8080',//订单
      // '/fresh-goods':'http://192.168.0.12:8080',//商品
      // '/fresh-front':'http://192.168.0.111:9090',//首页
      // '/fresh-voucher':'http://192.168.0.111:9090',//优惠券
      // '/fresh-bills':'http://192.168.0.111:9090',//账单
      // '/user-center':'http://192.168.0.111:9090',//用户中心
      // '/fresh-order':'http://192.168.0.111:9090',
      // '/fresh-member':'http://192.168.0.111:9090'
  },
    // context:[
    //   '/image-base',//图片
    //   '/fresh-order' ,//订单
    //   '/fresh-goods',//商品
    //   '/fresh-front',//首页
    //   '/fresh-voucher',//优惠券
    //   '/fresh-bills' ,//账单
    //   '/user-center',//用户中心
    // ],
    // proxypath: 'http://192.168.0.111:9090' ,
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
