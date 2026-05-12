const { execSync } = require('child_process');
const webpack = require('webpack');

function getGitVersion() {
  try {
    return execSync('git describe --tags --always').toString().trim();
  } catch (e) {
    return 'unknown';
  }
}

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: '/',
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.VUE_APP_GIT_VERSION': JSON.stringify(getGitVersion()),
      }),
    ],
  },
  devServer: {
    proxy: {
      "/v1": {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: true,
        onError(err, req, res) {
          console.warn('Proxy error:', err.message);
          res.writeHead(502, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Proxy error', message: err.message }));
        },
      }
    }
  }
}
