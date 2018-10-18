let path = require('path')
module.exports = {
  "config": path.resolve(__dirname, 'config/database'),
  "models-path": path.resolve(__dirname, 'app/models'),
  "models-path-files-ignore": ['ApplicationRecord.js'],
  "migrations-path": path.resolve(__dirname, 'db/migrations')
}