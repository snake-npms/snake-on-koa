let BaseController = require('./BaseController')
class UsersController extends BaseController {
  constructor () {
    super({prefix: '/admin/users'})
    
    this.get('/', async (ctx, next) => {
      ctx.body = await User.all()
    })
  }
}
module.exports = UsersController