#!/usr/bin/env node
require('snake-utils')
const program = require('commander')
const packageJson = require('../package.json');
const { exec } = require('child_process')
program.version(packageJson.version)

// snake new project -d [mysql|sqlite3]
program.command('new <project>')//.arguments('<project>')
  .description('new project')
  .option('-d --db <db>', 'db type', /^(sqlite3|mysql)$/i, 'sqlite3')
  .action(require('./actions/new'))

// snake console
program.command('console')
  .alias('c')
  .description('into console')
  .action(require('./actions/console'));

program.command('generate <cmd>')
  .alias('g')
  .description('generate [controller|model]')
  .arguments('<cmd> [value][arguments]')
  .action((cmd, value) => {
    let args = process.argv.slice(process.argv.indexOf(value) + 1, process.argv.length)
    switch (cmd) {
      case 'controller':
        require('./actions/controller-generate')(value, args)
        break
      case 'model':
        require('./actions/model-generate')(value, args)
      default:
    }
  })

program.command('destroy <cmd>')
  .alias('d')
  .description('desctroy [controller|model]')
  .arguments('<cmd> [value][arguments]')
  .action((cmd, value) => {
    let args = process.argv.slice(process.argv.indexOf(value) + 1, process.argv.length)
    switch (cmd) {
      case 'controller':
        require('./actions/controller-destroy')(value, args)
        break
      default:
    }
  })

program.parse(process.argv);