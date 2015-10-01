var exec       = require('child_process').exec
var assert     = require('assert')
var concurrent = require('toolz/src/async/concurrent')
var display    = require('./display')
var isEmpty    = require('toolz/src/lang/isEmpty')

function install (opts, next) {
  if (isEmpty(opts.packages) && isEmpty(opts.devpackages)) return next(null)
  else display.heading('Dependencies:')

  function installDependencies (cmd, packages, msg, cb) {
    if (!isEmpty(packages)) {
      concurrent.each(packages, function (val, key, done) {
        exec(cmd + val, function (err) {
          display.event('module:', val, 'red')
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
    next(null)
  })
}

module.exports = install
