#!/usr/bin/env node
const program = require('commander')
const packageJson = require('../package.json');
const { exec } = require('child_process')
program.version(packageJson.version)

program.command('new <project>')//.arguments('<project>')
.option('-d --db <db>', 'db type', /^(sqlite3|mysql)$/i, 'sqlite3')
.action(require('./actions/new'))

program.parse(process.argv);