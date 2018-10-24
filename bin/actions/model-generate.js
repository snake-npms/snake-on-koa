const fs = require('fs')
const pluralize = require('pluralize')
const path = require('path')
const utils = require('../private/utils')
module.exports = async (model, attributes) => {
  const modelName = pluralize.singular(model).toVarCase().toCapitalize()
  const tableName = pluralize.plural(model).toSnakeCase()
  
  console.log({tableName, modelName}, attributes)
  
  let defaultOrmRcPath = path.join(process.cwd(), '.snakeormrc.js')
  let migrationsPath = path.join(process.cwd(), 'db/migrations')
  if (fs.existsSync(defaultOrmRcPath)) {
    let ormRcConfig = require(defaultOrmRcPath)
    migrationsPath = ormRcConfig["migrations-path"] || migrationsPath
  }
  let migrateFileName = `${Date.current().strftime('YMdHms')}_create_${tableName}`
  
  // 判断文件是否存在
  if (fs.readdirSync(migrationsPath).filter((file) => { return file.replace(/^[0-9|_]+/, '').replace('\.js', '') === `create_${tableName}`}).length) {
    throw Error(`Err: ${tableName} file Exist!`)
  }
  
  await utils.readWriteFile(path.join(__dirname, '../private/template/models/template.njk'), path.join(process.cwd(), `app/models/${modelName}.js`), {modelName})
  
  // migrations
  let gFields = []
  attributes.forEach((attr) => {
    let [field, type, ...more] = attr.split(':')
    let options = {}
    if (more.indexOf('index') !== -1) {
      options.index = true
    }
    gFields.push(`t.${type}(\`${field}\`, ${JSON.stringify(options)})`)
  })
  
  await utils.readWriteFile(path.join(__dirname, '../private/template/migrations/table-create-template.njk'), path.join(migrationsPath, `${migrateFileName}.js`), {table: tableName, gFields})
  console.log(migrateFileName)
}