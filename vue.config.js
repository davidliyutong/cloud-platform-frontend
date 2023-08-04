module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: '/',
  devServer: {
    proxy: {
      "/v1": {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
}
