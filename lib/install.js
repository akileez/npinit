const exec = require('child_process').exec
const assert = require('assert')
const clrz = require('colorz')
const git = require('./git')
const isNull = require('./isNull')
const eachAsync = require('each-async')
const parallel = require('run-parallel')

module.exports = installDeps

// clrz settings for colorized output
const blk = clrz.black
const dim = clrz.dim
const blu = clrz.blue
const mag = clrz.magenta
const red = clrz.red

function installDeps (opts) {
  process.stdout.write(blu('\nDependencies:\n\n'))

  parallel([
    function (cb) {
      if (!isNull(opts.devpackages)) {
        eachAsync(opts.devpackages, function (item, index, done) {
          exec('npm install --save-dev ' + item, function (err) {
            process.stdout.write(dim(blk('  module: ')) + red(item) + '\n')
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
            process.stdout.write(dim(blk('  module: ')) + red(item) + '\n')
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
