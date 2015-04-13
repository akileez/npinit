const assert = require('assert')
const nconf = require('npmconf')
const argv = require('argh').argv

module.exports = makeConfig

// user information & optional overrides
// ///////////////////////////////////////////////////////////////////////////////

function makeConfig (opts, cb) {
  getLicense(opts, function (license) {
    if (argv.license) opts.meta.license = argv.license
    else opts.meta.license = license

    getVersion(opts, function (version) {
      if (argv.pkgv) opts.meta.version = argv.pkgv
      else opts.meta.version = version

      getAuthor(opts, function (author) {
        if (argv.author) opts.meta.author = argv.author
        else opts.meta.author = author

        getEmail(opts, function (email) {
          if (argv.email) opts.meta.email = argv.email
          else opts.meta.email = email

          getURL(opts, function (url) {
            if (argv.url) opts.meta.url = argv.url
            else opts.meta.url = url

            getName(opts, function (name) {
              if (argv.user) opts.meta.name = argv.user
              else opts.meta.name = name

              cb(opts)
            })
          })
        })
      })
    })
  })
}

function getLicense (conf, cb) {
  nconf.load({}, function (err, config) {
    assert.ifError(err)
    var license = config.get('init.license') || 'ISC'
    cb(license)
  })
}

function getVersion (conf, cb) {
  nconf.load({}, function (err, config) {
    assert.ifError(err)
    var version = config.get('init.version') || '0.1.0'
    cb(version)
  })
}

function getAuthor (conf, cb) {
  nconf.load({}, function (err, config) {
    assert.ifError(err)
    var author = config.get('init.author.name') || 'Your Name'
    cb(author)
  })
}

function getEmail (conf, cb) {
  nconf.load({}, function (err, config) {
    assert.ifError(err)
    var email = config.get('init.author.email') || 'your@email.com'
    cb(email)
  })
}

function getURL (conf, cb) {
  nconf.load({}, function (err, config) {
    assert.ifError(err)
    var url = config.get('init.author.url') || 'yourURL.com'
    cb(url)
  })
}

// get user info
function getName (conf, cb) {
  nconf.load({}, function (err, config) {
    assert.ifError(err)
    var name = config.get('init.author.github') || 'githubName'
    cb(name)
  })
}
