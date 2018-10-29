const jwt = require('jsonwebtoken')
const crypto = require('crypto')
let BaseController = require('./BaseController')
class UsersController extends BaseController {
  constructor () {
    super({prefix: '/api/v1/users'})
    this.get('/info', this.authorize, async (ctx, next) => {
      ctx.body = ctx.currentLogin
    })
    // create / register
    this.post('/', async (ctx, next) => {
      let {username, password} = ctx.params
      password = crypto.createHash('sha1').update(password).digest('hex')
      await User.create({username, password})
      ctx.body = {msg: 'Register Success'}
    })
    this.post('/login', async (ctx) => {
      let {username, password} = ctx.params
      password = crypto.createHash('sha1').update(password).digest('hex')
      let user = await User.findBy({username})
      if (user && user.password === password) {
        // 生成 token 返回给客户端
        let token = jwt.sign({
          data: user.pick(['id', 'username']),
          // 设置 token 过期时间
          exp: Math.floor(Date.now() / 1000) + (60 * 60), // 60 seconds * 60 minutes = 1 hour
        }, application['_envVars']['jwtSignSecret'])
        ctx.cookies.set('authorization', token, {httpOnly: false})
        ctx.body = {
          mgs: 'Login Success',
        }
      } else {
        ctx.body = {mgs: 'Login Failed'}
      }
    })
  }
}
module.exports = UsersController