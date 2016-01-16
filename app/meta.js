const assert = require('assert')
const nconf  = require('npmconf')

// user information & optional overrides
function getMeta (opts, cb) {
  return nconf.load({}, function (err, config) {
    assert.ifError(err)
    opts.meta.license = opts.meta.license || config.get('init.license') || 'ISC'
    opts.meta.version = opts.meta.version || config.get('init.version') || '0.1.0'
    opts.meta.author  = opts.meta.author || config.get('init.author.name') || 'Your Name'
    opts.meta.email   = opts.meta.email || config.get('init.author.email') || 'your@email.com'
    opts.meta.name    = opts.meta.name || config.get('init.author.github') || 'githubName'
    opts.meta.url     = opts.meta.url || config.get('init.author.url')
      || 'https://github.com/' + opts.meta.name + '/' + opts.meta.packageName
    cb(opts)
  })
}

module.exports = getMeta
