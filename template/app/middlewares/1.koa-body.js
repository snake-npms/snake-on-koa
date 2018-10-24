// npm install koa-body
const koaBody = require('koa-body')
module.exports = [
  koaBody(),
  async (ctx, next) => {
    let params = ctx.query
    Object.defineProperties(ctx, {
      params: { get () { return params } }
    })
    if (/post|put|delete/gi.test(ctx.method)) {
      params = Object.assign({}, params, ctx.request.body)
    }
    await next()
  }
]