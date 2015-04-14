const exec = require('child_process').exec
const assert = require('assert')
const chalk = require('chalk')
const git = require('./git')
const eachAsync = require('each-async')

module.exports = installDeps

// chalk settings for colorized output
const blk = chalk.dim.black
const blu = chalk.blue
const mag = chalk.magenta
const red = chalk.red

function installDeps (opts) {
  process.stdout.write(blu('\nDependencies:\n\n'))

  eachAsync(opts.packages, function (item, index, done) {
    exec('npm install --save-dev ' + item, function (err) {
      assert.ifError(err)
      process.stdout.write(blk('  module: ') + red(item) + '\n')
      done()
    })
  }, function (err) {
    assert.ifError(err)
    if (opts.git) git(opts)
    else process.stdout.write(mag('\n\nAll done.\n'))
  })

}
