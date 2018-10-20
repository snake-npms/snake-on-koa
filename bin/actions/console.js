const repl = require('repl')
const stubber = require('async-repl/stubber')
const path = require('path')
async function initializeContext () {
  const Application = require(path.resolve(process.cwd(), 'config/application'))
  let application = new Application({skipKoa: true})
  await application.register()
}
module.exports = async function () {
  await initializeContext()
  const replInstance = repl.start({
    prompt: 'snake> ',
    useGlobal: true,
    useColors: true,
    experimentalReplAwait: true
    // replMode: repl.REPL_MODE_STRICT
  })
  stubber(replInstance)
}