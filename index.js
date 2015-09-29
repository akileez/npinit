/*!
 * ninit <https://github.com/akileez/ninit>
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
var logger      = require('./lib/logger')

function proc (opts, argv) {

  var operations = [
    getUserInfo
    // createDir,
    // installFiles,
    // installDependencies,
    // initRepo,
  ]

  iterate.series(operations, function (err) {
    assert.ifError(err)
    console.log('all done')
  })

  function getUserInfo (cb) {
    meta(opts, argv, function (res) {
      opts = res
      logger(res)
      if (argv.dry) {
        process.stdout.write('\n')
        process.stdout.write(clrz.cyan('Options'))
        process.stdout.write('\n\n')
        clog(res)
        cb(null)
      } else {
        cb(null)
      }
    })
  }

  // function createDir (cb) {
  //   mkdirp(opts.meta.packageName, function (err) {
  //     process.chdir(opts.meta.packageName)
  //     cb(null)
  //   })
  // }

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
