const assert = require('assert')
const nconf = require('npmconf')
const argv = require('argh').argv

module.exports = makeConfig

// user information & optional overrides
// ///////////////////////////////////////////////////////////////////////////////

function makeConfig (opts, cb) {
  getMeta(opts, function (license, version, author, email, url, name) {
    if (argv.license) opts.meta.license = argv.license
    else opts.meta.license = license

    if (argv.pkgv) opts.meta.version = argv.pkgv
    else opts.meta.version = version

    if (argv.author) opts.meta.author = argv.author
    else opts.meta.author = author

    if (argv.email) opts.meta.email = argv.email
    else opts.meta.email = email

    if (argv.url) opts.meta.url = argv.url
    else opts.meta.url = url

    if (argv.user) opts.meta.name = argv.user
    else opts.meta.name = name

    cb(opts)
  })
}

function getMeta (conf, cb) {
  nconf.load({}, function (err, config) {
    assert.ifError(err)
    var license = config.get('init.license') || 'ISC'
    var version = config.get('init.version') || '0.1.0'
    var author = config.get('init.author.name') || 'Your Name'
    var email = config.get('init.author.email') || 'your@email.com'
    var url = config.get('init.author.url') || 'yourURL.com'
    var name = config.get('init.author.github') || 'githubName'
    cb(license, version, author, email, url, name)
  })
}
