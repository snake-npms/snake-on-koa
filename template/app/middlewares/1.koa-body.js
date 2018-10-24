// npm install koa-body
const koaBody = require('koa-body')
module.exports = [
  koaBody({
    multipart: true,
    formidable: {
      hash: 'sha1',
      maxFileSize: 3 * 1024 * 1024	// 设置上传文件大小最大限制，默认3M
    }
  }),
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