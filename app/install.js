var concurrent = require('toolz/src/async/concurrent')
var slice      = require('toolz/src/array/sliced')
var display    = require('./display')
var exec       = require('child_process').exec
var assert     = require('assert')

function install (opts, next) {
  if (isEmpty(opts.packages, opts.devpackages)) return next(null)
  else display.heading('Dependencies:')

  var commands = {
    cmd1: function (cb) {
      var cmd = 'npm install --save-dev '
      installDependencies(cmd, opts.devpackages, function (err) {
        cb(null)
      })
    },

    cmd2: function (cb) {
      var cmd = 'npm install --save '
      installDependencies(cmd, opts.packages, function (err) {
        cb(null)
      })
    }
  }

  concurrent.parallel(commands, function (err) {
    assert.ifError(err)
    next(null)
  })

  function installDependencies (cmd, packages, cb) {
    if (!isEmpty(packages)) {
      concurrent.each(packages, function (module, key, done) {
        exec(cmd + module, function (err, stdout, stderr) {
          if (opts.verbose){
            if (stderr) display.stderr(stderr, module)
            else display.stdout('installed module:', stdout)
          } else {
            display.event('module:', stderr ? module + ' (err)' : module, 'red')
          }
          done(null)
        })
      }, function (err) {
        assert.ifError(err)
        cb(null)
      })
    } else {
      cb(null)
    }
  }
}

function isEmpty () {
  var args = slice(arguments)
  return args.every(function (val) {
    return !val.length
  })
}

module.exports = install
