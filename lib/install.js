const exec = require('child_process').exec
const assert = require('assert')
const chalk = require('chalk')
const git = require('./git')
const cmds = require('run-parallel')

module.exports = installDeps

// chalk settings for colorized output
const blk = chalk.dim.black
const blu = chalk.blue
const mag = chalk.magenta
const red = chalk.red

function installDeps (opts) {

  process.stdout.write(blu('\nDependencies:\n\n'))

  cmds([
    function (cb) {
      exec('npm install --save-dev standard', function (err) {
        process.stdout.write(blk('  module: ') +  red('standard') + '\n')
        cb(err, 'standard')
      })
    },
    function (cb) {
      exec('npm install --save-dev mocha', function (err) {
        process.stdout.write(blk('  module: ') + red('mocha') + '\n')
        cb(err, 'mocha')
      })
    }
  ], function (err, results) {
    assert.ifError(err)
    if (opts.git) git(opts)
    else process.stdout.write(mag('\n\nAll done.\n'))
  })

}
