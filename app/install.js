var concurrent = require('../src/concurrent')
var slice      = require('../src/utils').sliced
var display    = require('./display')
var exec       = require('child_process').execFile
var assert     = require('assert')

function install (opts, next) {
  if (isEmpty(opts.packages, opts.devpackages)) return next(null)
  else display.heading('Dependencies:')

  var commands = {
    cmd1: function (cb) {
      installDependencies('--save-dev', opts.devpackages, function (err) {
        assert.ifError(err)
        cb(null)
      })
    },

    cmd2: function (cb) {
      installDependencies('--save', opts.packages, function (err) {
        assert.ifError(err)
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
        exec('npm', ['install', cmd, module], function (err, stdout, stderr) {
          // purposely not handling error.
          // I want the error to pass-through and display reuslts with stderr
          // or display.event. npm error should not stop creation of module.
          if (opts.verbose) {
            if (stderr) display.stderr(stderr, module)
            if (stdout) display.stdout('installed module:', stdout)
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
