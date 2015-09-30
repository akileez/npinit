var exec              = require('child_process').exec
var assert            = require('assert')
var git               = require('./git')
var concurrent        = require('./src/concurrent')
var logger            = require('./src/logger')
var isEmpty           = require('./src/isEmpty')

function install (opts) {
  logger.info('\nDependencies:\n\n')

  function installDependencies (cmd, packages, msg, cb) {
    if (!isEmpty(packages)) {
      concurrent.each(packages, function (val, key, done) {
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

  concurrent.parallel(commands, function (err, results) {
    assert.ifError(err)
    if (opts.git) git(opts)
    else logger.msgdone()
  })
}

module.exports = install
