const fs = require('fs')
const path = require('path')
module.exports = async function (controller, args) {
  if (!controller.match(/Controller$/)) {
    controller = `${controller}Controller`
  }
  let filename = controller.split('/').pop().toCapitalize()
  controller = path.join('app/controllers', controller, '../', filename)
  let filePath = path.join(process.cwd(), controller, '../')
  fs.unlinkSync(path.join(filePath, `./${filename}.js`))
  console.log('Removed: ', controller)
}