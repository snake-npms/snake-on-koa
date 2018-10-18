const SnakeApp = require('snake-on-koa-core')
class Application extends SnakeApp {
  // PORT
  constructor (options = {}) {
    super(options)
  }
}
module.exports = Application