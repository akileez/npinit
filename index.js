const install = require('./lib/install')
const write = require('./lib/write')
const git = require('./lib/git')
const tim = require('./lib/timeout')
const mkdir = require('mkdirp')

module.exports = init

// Init writing files
// @param {Object} opts
function init (opts) {
  const pn = opts.meta.packageName

  mkdir.sync(pn)
  process.chdir(pn)

  tmpls(opts, function (done) {
    if (opts.install) install(opts)
    else if (opts.git) git(opts)
    else process.stdout.write('We are done')
  })
}

function tmpls (opts, cb) {
  const writer = write(opts.meta)
  const files = opts.files

  process.stdout.write('\n\x1b[36mTemplates:\x1b[0m\n')

  if (files.gitignore) writer('./.gitignore', '../templates/gitignore')
  if (files.index) writer('./index.js', '../templates/index.js')
  if (files.license) writer('./LICENSE', '../templates/LICENSE')
  if (files.package) writer('./package.json', '../templates/package')
  if (files.readme) writer('./README.md', '../templates/README.md')
  if (files.test) writer('./test.js', '../templates/test.js')
  if (files.travis) writer('./.travis.yml', '../templates/travis.yml')
  tim(50)(function () {
    cb(true)
  })
}
