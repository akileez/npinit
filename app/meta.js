const assert = require('assert')
const nconf = require('npmconf')

// user information & optional overrides
function makeConfig (opts, cb) {
  return getMeta(opts, function (license, version, author, email, url, name) {
    if (!opts.meta.license) opts.meta.license = license
    if (!opts.meta.version) opts.meta.version = version
    if (!opts.meta.author) opts.meta.author = author
    if (!opts.meta.email) opts.meta.email = email
    if (!opts.meta.url) opts.meta.url = url
    if (!opts.meta.name) opts.meta.name = name

    return cb(opts)
  })
}

function getMeta (conf, cb) {
  nconf.load({}, function (err, config) {
    assert.ifError(err)
    var license = config.get('init.license') || 'ISC'
    var version = config.get('init.version') || '0.1.0'
    var author = config.get('init.author.name') || 'Your Name'
    var email = config.get('init.author.email') || 'your@email.com'
    var name = config.get('init.author.github') || 'githubName'
    var url = config.get('init.author.url') || 'https://github.com/' + name + '/' + conf.meta.packageName
    cb(license, version, author, email, url, name)
  })
}

module.exports = makeConfig
