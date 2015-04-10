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

  process.stdout.write('\n\x1b[36mDependencies:\x1b[0m\n')

  cmds([
    function (cb) {
      exec('npm install --save-dev standard', function (err) {
        process.stdout.write(blk('  module: '), blu('standard'))
        cb(err, 'standard')
      })
    },
    function (cb) {
      exec('npm install --save-dev mocha', function (err) {
        process.stdout.write(blk('  module: '), blu('mocha'))
        cb(err, 'mocha')
      })
    }
  ], function (err, results) {
    assert.ifError(err)
    if (opts.git) git(opts)
    else process.stdout.write(mag('\n\nAll done.\n'))
  })

}
