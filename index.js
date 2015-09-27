/*!
 * ninit <https://github.com/akileez/ninit>
 *
 * Copyright (c) 2015 Keith Williams.
 * Licensed under the ISC license.
 */
var argv        = require('argh').argv
var mkdirp      = require('mkdirp')
var meta        = require('./app/meta')
var install     = require('./app/install')
var initgit     = require('./app/initgit')
var installdeps = require('./app/installDependencies')
var iterate     = require('./lib/iterate')
var logger      = require('./lib/logger')


var operations = [
  initConfig,
  userInfo,
  createDir,
  installFiles,
  installDependencies,
  initRepo,
]

iterate.each(operations, function (err) {
  assert.ifError(err)
  console.log('all done')
})

function userInfo (cb) {
  meta(opts, argv, function (res) {
    opts = res
    cb(null)
  })
}

function createDir (cb) {
  mkdirp(opts.meta.packageName, function (err) {
    process.chdir(opts.meta.packageName)
    cb(null)
  })
}

function installFiles (cb) {
  install(opts, function (res) {
    // something here maybe?
    cb(null)
  })
}

function installDependencies (cb) {
  installdeps(opts, function (res) {
    cb(null)
  })
}

function initRepo (cb) {
  initgit(opts, function (res) {
    cb(null)
  })
}