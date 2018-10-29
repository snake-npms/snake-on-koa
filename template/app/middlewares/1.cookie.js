const jwt = require('jsonwebtoken')
const jwtSignSecret = application._envVars['jwtSignSecret']
module.exports = async (ctx, next) => {
  const token = ctx.cookies.get('authorization')
  let payload = null
  console.log('token', token)
  if (token) {
    try {
      payload = await verifyPromise(token)  // // 解密，获取payload
    } catch (err) {
      ctx.cookies.set('authorization', null)
    }
  }
  console.log('payload', payload)
  ctx.currentLogin = payload && payload.data
  await next()
}

function verifyPromise (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSignSecret, function(err, decoded) {
      if (err) {
        reject(err)
      }
      resolve(decoded)
    })
  })
}