const fs = require('fs-extra')
const utils = require('../private/utils')
const path = require('path')
module.exports = async (controller, args) => {
  if (!controller.match(/Controller$/)) {
    controller = `${controller}Controller`
  }
  let filename = controller.split('/').pop().toCapitalize()
  controller = path.join('app/controllers', controller, '../', filename)
  let filePath = path.join(process.cwd(), controller, '../')
  fs.mkdirpSync(filePath)
  let prefix = controller.replace('Controller', '').split('/').map(item => item.toSnakeCase()).join('/')
  let options = {}
  args.forEach(key => {
    options[key] = true
  })
  console.log(controller, options)
  await utils.readWriteFile(path.join(__dirname, '../private/template/controllers/template.njk'), path.join(filePath, `./${filename}.js`), Object.assign({filename, prefix}, options))
}