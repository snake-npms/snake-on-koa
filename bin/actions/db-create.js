const path = require('path')
module.exports = async function () {
  const Application = require(path.resolve(process.cwd(), 'config/application'))
  let { SnakeOrm } = Application
  let rcConfigPath = null
  try {
    rcConfigPath = require(path.join(process.cwd(), '.snakeormrc.js'))['config']
  } catch (err) {
    rcConfigPath = path.join(process.cwd(), 'config/database')
  }
  let connectOptions = require(rcConfigPath)
  let env = process.env.NODE_ENV || 'development'
  connectOptions = Object.assign(connectOptions, connectOptions[env])
  let shouldCreateDatabase = connectOptions.database
  if (connectOptions.dialect === 'mysql') {
    connectOptions.database = 'information_schema'
  }
  let orm = SnakeOrm.getOrCreateSnakeOrmProxy(connectOptions.database, connectOptions.username, connectOptions.password, connectOptions)
  await orm.createDatabase(shouldCreateDatabase)
  process.exit(0)
}