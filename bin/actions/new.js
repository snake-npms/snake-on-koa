const path = require('path')
const fs = require('fs-extra')
const utils = require('../private/utils')
const templatePath = path.resolve(__dirname, '../../template')
module.exports = function (projectName, options) {
  const projectPath = path.resolve(process.cwd(), projectName)
  // create project dir
  fs.mkdirpSync(projectPath)
  // copy template
  fs.copySync(path.join(templatePath, 'app'), path.join(projectPath, 'app'))
  fs.copySync(path.join(templatePath, 'config'), path.join(projectPath, 'config'))
  fs.copySync(path.join(templatePath, 'db'), path.join(projectPath, 'db'))
  fs.copySync(path.join(templatePath, 'logs'), path.join(projectPath, 'logs'))
  fs.copySync(path.join(templatePath, '.gitignore'), path.join(projectPath, '.gitignore'))
  fs.copySync(path.join(templatePath, '.snakeormrc.js'), path.join(projectPath, '.snakeormrc.js'))
  fs.copySync(path.join(templatePath, 'package.json'), path.join(projectPath, 'package.json'))
  utils.readWriteFile(path.join(templatePath, 'shipitfile.njk'), path.join(projectPath, 'shipitfile.js'), {projectName})
  fs.copySync(path.join(templatePath, 'start.js'), path.join(projectPath, 'start.js'))
  
  // change database config
  let dbPath = path.join(projectPath, 'config/database.json')
  let databaseJson = Object.assign(fs.readJsonSync(dbPath), { dialect: options.db })
  databaseJson['development']['database'] = `${projectName.replace('-', '_')}_development`
  databaseJson['test']['database'] = `${projectName.replace('-', '_')}_test`
  if (options.db === 'sqlite3') {
    databaseJson['development']['storage'] = `db/${databaseJson['development']['database']}`
    databaseJson['test']['storage'] = `db/${databaseJson['test']['database']}`
  }
  fs.writeJsonSync(dbPath, databaseJson, {spaces: 2})
  
  // change package.json config
  let packageJsonPath = path.join(projectPath, 'package.json')
  let packageJson = fs.readJsonSync(packageJsonPath)
  switch (options.db) {
    case 'mysql':
      packageJson['dependencies']['mysql2'] = '^1.6.1'
      break
    default:
      packageJson['dependencies']['sqlite3'] = '^4.0.2'
  }
  fs.writeJsonSync(packageJsonPath, packageJson, {spaces: 2})
  
  
  console.log(projectName, options.db)
}