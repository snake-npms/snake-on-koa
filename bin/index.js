#!/usr/bin/env node
require('snake-utils')
const program = require('commander')
const packageJson = require('../package.json');
const { exec } = require('child_process')
program.version(packageJson.version)

// snake new project -d [mysql|sqlite3]
program.command('new <project>')//.arguments('<project>')
  .option('-d --db <db>', 'db type', /^(sqlite3|mysql)$/i, 'sqlite3')
  .action(require('./actions/new'))

// snake console
program.command('console').action(require('./actions/console'));

program.command('generate <cmd>')
  .arguments('<cmd> [value][arguments]')
  .action((cmd, value) => {
    let args = process.argv.slice(process.argv.indexOf(value) + 1, process.argv.length)
    switch (cmd) {
      case 'controller':
        require('./actions/generate-controller')(value, args)
        break
      default:
    }
  })

program.parse(process.argv);