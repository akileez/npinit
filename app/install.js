var concurrent = require('toolz/src/async/concurrent')
var slice      = require('toolz/src/array/sliced')
var display    = require('./display')
var exec       = require('child_process').exec
var assert     = require('assert')

function install (opts, next) {
  if (isEmpty(opts.packages, opts.devpackages)) return next(null)
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

function isEmpty () {
  var args = slice(arguments)
  return args.every(function (val) {
    return !val.length
  })
}

module.exports = install
