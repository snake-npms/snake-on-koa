const fs = require('fs')
const pluralize = require('pluralize')
const path = require('path')
const utils = require('../private/utils')
module.exports = async (migrationName, attributes) => {
  migrationName = migrationName.toSnakeCase()
  
  let defaultOrmRcPath = path.join(process.cwd(), '.snakeormrc.js')
  let migrationsPath = path.join(process.cwd(), 'db/migrations')
  if (fs.existsSync(defaultOrmRcPath)) {
    let ormRcConfig = require(defaultOrmRcPath)
    migrationsPath = ormRcConfig["migrations-path"] || migrationsPath
  }
  
  // 判断文件是否存在
  if (fs.readdirSync(migrationsPath).filter((file) => { return file.replace(/^[0-9|_]+/, '').replace('\.js', '') === migrationName}).length) {
    throw Error(`Err: ${migrationName} file Exist!`)
  }
  
  let migrateFileName = `${Date.now().strftime('YMdHms')}_${migrationName.toSnakeCase()}`
  let templateFile = path.join(__dirname, '../private/template/migrations/table-change-template.njk')
  let gFields = []
  let tableName = migrationName.match(/[a-z]+$/)[0]
  // snake generate migration addColumnBirthdayAndAgeToUsers birthday:date age:integer:index
  if (/^add_column/gi.test(migrationName)) {
    attributes.forEach((attr) => {
      let [field, type, ...more] = attr.split(':')
      let options = {}
      if (more.indexOf('index') !== -1) {
        options.index = true
      }
      gFields.push(`await orm.addColumn('${tableName}', '${field}', '${type}', ${JSON.stringify(options)})`)
    })
  }
  // snake g migration renameColumnBirthdayToBirthFromUsers
  else if (/^rename_column/gi.test(migrationName)) {
    try {
      let beforeColumn = migrationName.match(/rename_column_[a-z]+/)[0].match(/[a-z]+$/)[0]
      let afterColumn = migrationName.match(/to_[a-z]+/)[0].match(/[a-z]+$/)[0]
      gFields.push(`// await orm.renameColumn('${tableName}', '${beforeColumn}', '${afterColumn}', 'field type ????', {})`)
    } catch (err) {
      gFields.push(`// await orm.renameColumn()`)
    }
  }
  // snake g migration removeColumnBirthdayFromUsers
  else if (/^remove_column/gi.test(migrationName)) {
    try {
      let field = migrationName.match(/remove_column_[a-z]+/)[0].match(/[a-z]+$/)[0]
      gFields.push(`await orm.removeColumn('${tableName}', '${field}')`)
    } catch (err) {
      console.log(err)
      gFields.push(`// await orm.removeColumn()`)
    }
  }
  // snake g migration removeIndexAgeFromUsers
  else if (/^remove_index/gi.test(migrationName)) {
    try {
      let field = migrationName.match(/remove_index_[a-z]+/)[0].match(/[a-z]+$/)[0]
      gFields.push(`await orm.removeIndex('${tableName}', '${field}')`)
    } catch (err) {
      gFields.push(`// await orm.removeIndex()`)
    }
  }
  // snake g migration dropTableUsers
  else if (/^drop_table/gi.test(migrationName)) {
    try {
      gFields.push(`await orm.dropTable('${tableName}')`)
    } catch (err) {
      console.log(err)
      gFields.push(`// await orm.dropTable()`)
    }
  }
  await utils.readWriteFile(templateFile, path.join(migrationsPath, `${migrateFileName}.js`), {gFields})
  console.log(migrateFileName)
}