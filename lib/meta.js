const assert = require('assert')
const nconf = require('npmconf')
const argv = require('argh').argv

module.exports = makeConfig

// user information & optional overrides
// ///////////////////////////////////////////////////////////////////////////////

function makeConfig (opts, cb) {
  if (argv.license) opts.meta.license = argv.license
  if (argv.pkgv) opts.meta.version = argv.pkgv

  if (argv.author) opts.meta.author = argv.author
  else getAuthor(opts, function (author) {
    opts.meta.author = author
  })

  if (argv.email) opts.meta.email = argv.email
  else getEmail(opts, function (email) {
    opts.meta.email = email
  })

  if (argv.user) opts.meta.name = argv.user
  else getName(opts, function (name) {
    opts.meta.name = name
  })

  function getAuthor (conf, cb) {
    nconf.load({}, function (err, config) {
      assert.ifError(err)
      var author = config.get('init.author.name')
      cb(author)
    })
  }

  function getEmail (conf, cb) {
    nconf.load({}, function (err, config) {
      assert.ifError(err)
      var email = config.get('init.author.email')
      cb(email)
    })
  }

  // get user info
  function getName (conf, cb) {
    nconf.load({}, function (err, config) {
      assert.ifError(err)
      var name = config.get('init.author.github')
      cb(name)
    })
  }

  cb(opts)
}
