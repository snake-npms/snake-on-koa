const Application = require('./config/Application')
let application = new Application()
async function start () {
  await application.register()
  application.startKoa(3000)
}
start()