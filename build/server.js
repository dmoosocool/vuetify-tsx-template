const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.dev.config')

const compiler = webpack(config)
const devServerOpitons = Object.assign({}, webpack.devServer, {
  open: true,
})

const server = new WebpackDevServer(compiler, devServerOpitons)

server.listen(8888, 'localhost', () => {
  console.log('starting server on http://localhost:8888')
})
