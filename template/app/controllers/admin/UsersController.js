let BaseController = require('./BaseController')
class UsersController extends BaseController {
  constructor () {
    super({prefix: '/admin/users'})
    
    this.get('/', async (ctx, next) => {
      ctx.body = await User.all()
    })
    
    this.post('/', async (ctx, next) => {
      console.log(111)
      ctx.body = ctx.params
    })
  }
}
module.exports = UsersController