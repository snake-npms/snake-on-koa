// npm install koa-static -S
const path = require('path')
const koaStatic = require('koa-static')
module.exports = koaStatic(path.join(__dirname, '../../public'), {
  maxAge: 1000 * 60 * 60 * 24 * 7,
  gzip: true
})