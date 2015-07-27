var exec              = require('child_process').exec
var assert            = require('assert')
var git               = require('./git')
var concurrentProcess = require('./src/parallel')
var eachParallel      = require('./src/parallel-each')
var logger            = require('./src/logger')
var isEmpty           = require('./src/isEmpty')

function install (opts) {
  logger.msg('\nDependencies:\n\n')
  // process.stdout.write(blu('\nDependencies:\n\n'))

  function installDependencies (cmd, packages, msg, cb) {
    if (!isEmpty(packages)) {
      eachParallel(packages, function (val, key, done) {
        exec(cmd + val, function (err) {
          // process.stdout.write(dim(blk('  module: ')) + red(item) + '\n')
          logger.events('  module: ', val)
          done(err)
        })
      }, function (err) {
        assert.ifError(err)
        cb(err, msg)
      })
    } else {
      cb(null, msg)
    }
  }

  var commands = {
    cmd1: function (cb) {
      var cmd = 'npm install --save-dev '
      installDependencies(cmd, opts.devpackages, 'devDependencies', function (err, msg) {
        cb(null, msg)
      })
    },

    cmd2: function (cb) {
      var cmd = 'npm install --save '
      installDependencies(cmd, opts.packages, 'dependencies', function (err, msg) {
        cb(null, msg)
      })
    }
  }

  concurrentProcess(commands, function (err, results) {
    assert.ifError(err)
    if (opts.git) git(opts)
    else process.stdout.write(mag('\nAll done.\n'))
  })
}

module.exports = install
