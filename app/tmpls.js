const expand     = require('../src/expand')
const concurrent = require('../src/concurrent')
const readFile   = require('../src/utils').readFile
const writeFile  = require('../src/utils').writeFile
const isOr       = require('../src/utils').isOr
const keys       = require('../src/utils').keys
const forEach    = require('../src/utils').forEach
const display    = require('./display')
const path       = require('path')
const assert     = require('assert')

function tmpls (opts, cb) {
  const license = opts.meta.license
  const tmpl = opts.files
  var files = []
  var filePath
  var lic

  forEach(keys(tmpl), function (name) {
    if (tmpl[name]) {
      if (isOr(name, 'gitignore', 'eslintrc')) return files.push(name)
      if (isOr(name, 'index', 'test')) return files.push(name + '.js')
      if (name === 'package') return files.push(name + '.json')
      if (name === 'readme') return files.push(name.toUpperCase() + '.md')
      if (name === 'travis') return files.push(name + '.yml')
    }
  })

  display.heading('Templates')

  concurrent.each(files, function (file, key, next) {
    if (isOr(file, 'gitignore', 'travis.yml', 'eslintrc')) {
      filePath = './.' + file
    } else {
      filePath = './' + file
    }

    processFile(filePath, '../lib/templates/', file, opts, function () {
      next(null)
    })
  }, function (err, results) {
    assert.ifError(err)
    if (license && license !== true) lic = license.toLowerCase()
    else lic = 'no'

    processFile('./LICENSE', '../lib/license/', lic, opts, function () {
      cb(null)
    })
  })
}

function processFile (filePath, srcdir, file, opts, done) {
  return readFile(path.join(__dirname, srcdir + file), function (err, res) {
    assert.ifError(err)
    var tmpl = expand(res, opts.meta)
    writeFile(filePath, tmpl, function (err) {
      assert.ifError(err)
      if (srcdir === '../lib/license/') file = file.toUpperCase() + ' LICENSE'
      display.event('create:', file, 'white')
      done()
    })
  })
}

module.exports = tmpls
