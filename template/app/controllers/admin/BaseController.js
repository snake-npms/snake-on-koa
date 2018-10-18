let ApplicationController = require('../ApplicationController')
class BaseController extends ApplicationController {
	constructor () {
		super(...arguments)
	}
}
module.exports = BaseController