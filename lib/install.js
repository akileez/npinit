var exec              = require('child_process').exec
var assert            = require('assert')
var git               = require('./git')
var concurrentProcess = require('./src/parallel')
var eachParallel      = require('./src/parallel-each')
var logger            = require('./src/logger')
var isEmpty           = require('./src/isEmpty')
var tim               = require('./src/timeout')

function install (opts) {
  logger.info('\nDependencies:\n\n')

  function installDependencies (cmd, packages, msg, cb) {
    if (!isEmpty(packages)) {
      eachParallel(packages, function (val, key, done) {
        exec(cmd + val, function (err) {
          logger.event('  module: ', val)
          done(null, msg)
        })
      }, function (err) {
        assert.ifError(err)
        cb(null, msg)
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
    else {
      tim(100)(function () {
        logger.msgdone()
      })
    }
  })
}

module.exports = install
