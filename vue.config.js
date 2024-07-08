module.exports = {
  // publicPath: '/webTest/',
  publicPath: './',
  configureWebpack: {
    externals: {
        './cptable': 'var cptable'
    }
  },
  // 打包之前关掉proxy代理。前端发送的请求里，如果直接指定了ip端口，就不会走nginx代理了
  devServer: {
    proxy: {
      '/': {
  
        // target:'https://10.0.8.6:8443',   // fw  admin   123123
        // target:'https://10.8.0.105:8443', 
        // target:'http://10.8.0.5:8080',   //zx   admin   123446
        target: 'http://10.8.0.120:8001',
        // target:'http://172.19.19.41:8001',
        // target: 'http://192.168.20.41:8805',
        
        ws: true,
        changeOrigin: true,
        secure: false, // 如果是https接口，需要配置这个参数
        // secure: true, // 如果是https接口，需要配置这个参数  https:false
        pathRewrite: { '^': '' },
        // pathRewrite: {'^/platform':''}
      }
    },

    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hotOnly: false,
    disableHostCheck: true,
  }
  // publicPath: '/'
}