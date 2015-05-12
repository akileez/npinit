const exec = require('child_process').exec
const assert = require('assert')
const chalk = require('chalk')
const git = require('./git')
const isNull = require('./isNull')
const eachAsync = require('each-async')
const parallel = require('run-parallel')

module.exports = installDeps

// chalk settings for colorized output
const blk = chalk.dim.black
const blu = chalk.blue
const mag = chalk.magenta
const red = chalk.red

function installDeps (opts) {
  process.stdout.write(blu('\nDependencies:\n\n'))

  parallel([
    function (cb) {
      if (!isNull(opts.devpackages)) {
        eachAsync(opts.devpackages, function (item, index, done) {
          exec('npm install --save-dev ' + item, function (err) {
            process.stdout.write(blk('  module: ') + red(item) + '\n')
            done(err)
          })
        }, function (err) {
          assert.ifError(err)
          cb(err, 'devDependencies')
        })
      } else {
        cb(null, 'devDependencies')
      }
    },
    function (cb) {
      if (!isNull(opts.packages)) {
        eachAsync(opts.packages, function (item, index, done) {
          exec('npm install --save ' + item, function (err) {
            process.stdout.write(blk('  module: ') + red(item) + '\n')
            done(err)
          })
        }, function (err) {
          assert.ifError(err)
          cb(err, 'dependencies')
        })
      } else {
        cb(null, 'dependencies')
      }
    }
  ], function (err, results) {
    assert.ifError(err)
    if (opts.git) git(opts)
    else process.stdout.write(mag('\nAll done.\n'))
  })

}
