const Server = require('./server.js')
const port = (process.env.OPENSHIFT_NODEJS_PORT || 8080)
const ip = (process.env.OPENSHIFT_NODEJS_IP|| '0.0.0.0')
const app = Server.app()

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('./webpack.dev.config.js')
  const compiler = webpack(config)

  app.use(webpackHotMiddleware(compiler))
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
}

app.listen(port, ip, function(){
  console.log("Listening on " + ip + ", server_port " + port)
});
