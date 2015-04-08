const exec = require('child_process').exec
const assert = require('assert')
const chalk = require('chalk')

module.exports = installDeps

// chalk settings for colorized output
const blk = chalk.dim.black
const blu = chalk.blue
const grn = chalk.green
const mag = chalk.magenta
const cyn = chalk.cyan

function installDeps () {
  console.log('')
  console.log(cyn('Dependencies:'))
  console.log('')

  exec('npm install --save-dev standard', function (err) {
    console.log(blk('  module: '), blu('standard'))
    assert.ifError(err)
  })

  exec('npm install --save-dev mocha', function (err) {
    console.log(blk('  module: '), blu('mocha'))
    assert.ifError(err)
  })
}
