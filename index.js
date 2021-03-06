/*!
 * npinit <https://github.com/akileez/npinit>
 *
 * Copyright © 2015 Keith Williams.
 * Licensed under the ISC license.
 */

var iterate = require('./src/iterate')
var meta    = require('./app/meta')
var tmpls   = require('./app/tmpls')
var git     = require('./app/git')
var install = require('./app/install')
var display = require('./app/display')
var mkdirp  = require('mkdirp')
var assert  = require('assert')

function proc (opts) {
  var operations = [
    getUserInfo,
    createDir,
    expandTmpls,
    npmInstall,
    initRepo
  ]

  iterate.series(operations, function (err) {
    assert.ifError(err)
    display.done()
  })

  function getUserInfo (cb) {
    meta(opts, function (res) {
      opts = res
      display.log(res)
      if (opts.dryrun) {
        display.heading('Options')
        display.dry(res)
        cb(null)
      } else {
        cb(null)
      }
    })
  }

  function createDir (cb) {
    if (!opts.dryrun) {
      mkdirp(opts.meta.packageName, function (err) {
        process.chdir(opts.meta.packageName)
        cb(null)
      })
    } else {
      cb(null)
    }
  }

  function expandTmpls (cb) {
    if (!opts.dryrun) {
      tmpls(opts, function (res) {
        // something here maybe?
        cb(null)
      })
    } else {
      cb(null)
    }
  }

  function npmInstall (cb) {
    if (!opts.dryrun) {
      install(opts, function (res) {
        cb(null)
      })
    } else {
      cb(null)
    }
  }

  function initRepo (cb) {
    if (!opts.dryrun) {
      git(opts, function (res) {
        cb(null)
      })
    } else {
      cb(null)
    }
  }
}

module.exports = proc
