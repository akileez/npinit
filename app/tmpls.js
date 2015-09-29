const expand = require('toolz/src/string/expand')
const display = require('../lib/display')
const path = require('path')
const fs = require('fs')


function tmpls (opts, cb) {
  const writer = write(opts.meta)
  const files = opts.files
  const license = opts.meta.license

  display.heading('Templates')

  Object.keys(files).forEach(function (name, key) {
    if (files[name]) {
      if (name === 'gitignore' || name === 'travis') {
        writer('./.' + name, '../tmpls/' + name)
      } else {
        writer('./' + name, '../tmpls/' + name)
      }
    }
  })

  if (files.license) {
    if (license === 'MIT') writer('./LICENSE', '../tmpls/LICENSE-MIT')
    else if (license === 'ISC') writer('./LICENSE', '../tmpls/LICENSE-ISC')
    else writer('./LICENSE', '../tmpls/LICENSE-UN')
  }
}


// Echo str > filePath.
// @param {String} filePath
// @param {String} str
function write (opts) {
  return function (filePath, str) {
    str = fs.readFileSync(path.join(__dirname, str), 'utf-8')
    var tmpl = expand(str, opts)
    fs.writeFile(filePath, tmpl, function (err) {
      if (err) display.error(err)
      display.event('create', filePath)
    })
  }
}

module.exports = tmpls