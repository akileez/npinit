const exec = require('child_process').exec
const assert = require('assert')
const chalk = require('chalk')
const git = require('./git')
const cmds = require('run-parallel')

module.exports = installDeps

// chalk settings for colorized output
const blk = chalk.dim.black
const blu = chalk.blue
const grn = chalk.green
const mag = chalk.magenta
const cyn = chalk.cyan

function installDeps (opts) {
  console.log('')
  console.log(cyn('Dependencies:'))
  console.log('')

  cmds([
    function (cb) {
      exec('npm install --save-dev standard', function (err) {
        console.log(blk('  module: '), blu('standard'))
        cb(err, 'standard')
      })
    },
    function (cb) {
      exec('npm install --save-dev mocha', function (err) {
        console.log(blk('  module: '), blu('mocha'))
        cb(err, 'mocha')
      })
    }
  ], function (err, results) {
    assert.ifError(err)
    if (results.length === 2) {
      if (opts.git) git(opts)
      else console.log(mag('\n\nAll done.\n'))
    }
  })

}
