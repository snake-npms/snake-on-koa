const path = require('path')
const promptly = require('promptly')
module.exports = async () => {
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
  let shouldDropDatabase = connectOptions.database
  if (connectOptions.dialect === 'mysql') {
    connectOptions.database = 'information_schema'
  }
  const answer = await promptly.confirm(`Are you sure drop database：${shouldDropDatabase}`)
  if (answer) {
    console.log('Dropping!')
    let orm = SnakeOrm.getOrCreateSnakeOrmProxy(connectOptions.database, connectOptions.username, connectOptions.password, connectOptions)
    await orm.dropDatabase(shouldDropDatabase)
  } else {
    console.log('Canceled!')
  }
  process.exit(0)
}