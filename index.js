const install = require('./lib/install')
const write = require('./lib/write')
const git = require('./lib/git')
const tim = require('./lib/timeout')
const mkdir = require('mkdirp')
const clrz = require('colorz')

module.exports = init

const blu = clrz.blue
const mag = clrz.magenta

// Init writing files
// @param {Object} opts
function init (opts) {
  const pn = opts.meta.packageName

  mkdir.sync(pn)
  process.chdir(pn)

  tmpls(opts, function (done) {
    if (opts.install) install(opts)
    else if (opts.git) git(opts)
    else process.stdout.write(mag('\nAll done.\n'))
  })
}

function tmpls (opts, cb) {
  const writer = write(opts.meta)
  const files = opts.files
  const license = opts.meta.license

  process.stdout.write(blu('\nTemplates:\n\n'))

  if (files.gitignore) writer('./.gitignore', '../templates/gitignore')
  if (files.index) writer('./index.js', '../templates/index.js')
  if (files.package) writer('./package.json', '../templates/package')
  if (files.readme) writer('./README.md', '../templates/README.md')
  if (files.test) writer('./test.js', '../templates/test.js')
  if (files.travis) writer('./.travis.yml', '../templates/travis.yml')
  if (files.license) {
    if (license === 'MIT') writer('./LICENSE', '../templates/LICENSE-MIT')
    else if (license === 'ISC') writer('./LICENSE', '../templates/LICENSE-ISC')
    else writer('./LICENSE', '../templates/LICENSE-UN')
  }
  tim(50)(function () {
    cb(true)
  })
}
