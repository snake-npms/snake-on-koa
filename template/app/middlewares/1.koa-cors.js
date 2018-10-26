// npm install --save koa2-cors
const cors = require('koa2-cors')
module.exports = cors({
  // allow cookie, frontend eg: vue axios please set {withCredentials: true}
  credentials: true
})