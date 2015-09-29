/*!
 * ninit <https://github.com/akileez/npinit>
 *
 * Copyright (c) 2015 Keith Williams.
 * Licensed under the ISC license.
 */

var mkdirp      = require('mkdirp')
var meta        = require('./app/meta')
var iterate     = require('toolz/src/async/iterate')
var assert      = require('assert')
var clog        = require('json-colorz')
var clrz        = require('colorz')
// var install     = require('./app/install')
// var initgit     = require('./app/initgit')
// var installdeps = require('./app/installDependencies')
// var iterate     = require('./lib/iterate')
var display      = require('./lib/display')

function proc (opts, argv) {

  var operations = [
    getUserInfo,
    createDir
    // installFiles,
    // installDependencies,
    // initRepo,
  ]

  iterate.series(operations, function (err) {
    assert.ifError(err)
    display.done()
  })

  function getUserInfo (cb) {
    meta(opts, argv, function (res) {
      opts = res
      display.log(res)
      if (argv.dry) {
        display.heading('Options')
        clog(res)
        cb(null)
      } else {
        cb(null)
      }
    })
  }

  function createDir (cb) {
    if (!argv.dry) {
      mkdirp(opts.meta.packageName, function (err) {
        process.chdir(opts.meta.packageName)
        cb(null)
      })
    } else {
      cb(null)
    }
  }

  // function installFiles (cb) {
  //   install(opts, function (res) {
  //     // something here maybe?
  //     cb(null)
  //   })
  // }

  // function installDependencies (cb) {
  //   installdeps(opts, function (res) {
  //     cb(null)
  //   })
  // }

  // function initRepo (cb) {
  //   initgit(opts, function (res) {
  //     cb(null)
  //   })
  // }
}

module.exports = proc
