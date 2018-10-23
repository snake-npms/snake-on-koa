async function parsePostData (ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = '';
      ctx.req.addListener('data', (data) => {
        postdata += data
      })
      ctx.req.addListener('end', () => {
        let parseData = parseQueryStr( postdata )
        resolve(parseData)
      })
    } catch ( err ) {
      reject(err)
    }
  })
}
// 将POST请求参数字符串解析成JSON
function parseQueryStr( queryStr ) {
  let queryData = {}
  let queryStrList = queryStr.split('&')
  // console.log( queryStrList )
  for ( let queryStr of queryStrList ) {
    let [key, ...values] = queryStr.split('=')
    queryData[key] = decodeURIComponent(values.join('='))
  }
  return queryData
}
module.exports = [async (ctx, next) => {
  let params = ctx.query
  Object.defineProperties(ctx, {
    params: { get () { return params } }
  })
  if (/post|put|delete/gi.test(ctx.method)) {
    params = Object.assign({}, params, await parsePostData(ctx))
  }
  await next()
}]