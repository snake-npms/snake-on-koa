const Application = require('./ApplicationRecord')
class User extends Application {
  constructor () {
    super(...arguments)
  }
}
module.exports = User