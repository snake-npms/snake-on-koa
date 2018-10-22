const path = require('path')
module.exports = async function () {
  const Application = require(path.resolve(process.cwd(), 'config/application'))
  let { SnakeOrm } = Application
  let rcConfig = require(path.join(process.cwd(), '.snakeormrc.js'))
  let configPath = rcConfig['config']
  let connectOptions = require(configPath)
  let env = process.env.NODE_ENV || 'development'
  connectOptions = Object.assign(connectOptions, connectOptions[env])
  let orm = SnakeOrm.getOrCreateSnakeOrmProxy(connectOptions.database, connectOptions.username, connectOptions.password, connectOptions)
  await orm.withTransaction(async () => {
    await orm.runMigrations(rcConfig['migrations-path'])
  })
  process.exit(0)
}