const assert = require('assert')
const nconf   = require('npmconf')
const argv    = require('argh').argv

module.exports = makeConfig

// user information & optional overrides
// ///////////////////////////////////////////////////////////////////////////////

function makeConfig (opts, cb) {
  if (argv.license) opts.meta.license = argv.license
  if (argv.pkgv) opts.meta.version = argv.pkgv

  if (argv.author) opts.meta.author = argv.author
  else author(opts, function (author) {
    opts.meta.author = author
  })

  if (argv.email) opts.meta.email = argv.email
  else email(opts, function (email) {
    opts.meta.email = email
  })

  if (argv.user) opts.meta.name = argv.user
  else whoami(opts, function (name) {
    opts.meta.name = name
  })

  function author (conf, cb) {
    nconf.load({}, function (err, config) {
      assert.ifError(err)
      author = config.get('init.author.name')
      cb(author)
    })
  }

  function email (conf, cb) {
    nconf.load({}, function (err, config) {
      assert.ifError(err)
      email = config.get('init.author.email')
      cb(email)
    })
  }

  // get user info
  function whoami (conf, cb) {
    nconf.load({}, function (err, config) {
      assert.ifError(err)
      name = config.get('init.author.github')
      cb(name)
    })
  }

  cb(opts)
}
