const { SnakeController } = require('snake-on-koa-core')
class ApplicationController extends SnakeController {
	constructor () {
		super(...arguments)
	}
}
module.exports = ApplicationController