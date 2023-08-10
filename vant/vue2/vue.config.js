module.exports = {
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production' ? '/vant-demo/' : '/',
  configureWebpack:{
    resolve:{
      alias:{
        'utils':'@/utils'
      }
    }
  }
};
