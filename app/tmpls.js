const expand    = require('toolz/src/string/expand')
const iterate   = require('toolz/src/async/iterate')
const readFile  = require('toolz/src/file/readFile')
const writeFile = require('toolz/src/file/writeFile')
const isOr      = require('toolz/src/lang/isOr')
const display   = require('./display')
const path      = require('path')
const fs        = require('fs')
const assert    = require('assert')

function tmpls (opts, cb) {
  const license = opts.meta.license
  const tmpl = opts.files
  var files = []
  var filePath

  Object.keys(tmpl).forEach(function (name) {
    if (tmpl[name]) {
      if (isOr(name, 'gitignore', 'eslintrc')) return files.push(name)
      if (isOr(name, 'index', 'test')) return files.push(name + '.js')
      if (name === 'package') return files.push(name + '.json')
      if (name === 'readme') return files.push(name.toUpperCase() + '.md')
      if (name === 'travis') return files.push(name + '.yml')
      if (name === 'license') {
        if (license === 'ISC') return files.push(name.toUpperCase() + '-ISC')
        else if (license === 'MIT') return files.push(name.toUpperCase() + '-MIT')
        else return files.push(name.toUpperCase() + '-UN')
      }
    }
  })
  // console.log(files)

  display.heading('Templates')

  iterate.each(files, function (file, key, next) {
    if (isOr(file, 'gitignore', 'travis.yml', 'eslintrc')) {
      filePath = './.' + file
    } else if (isOr(file, 'LICENSE-MIT', 'LICENSE-ISC', 'LICENSE-UN')) {
      filePath = './' + file.replace(/-(MIT|ISC|UN)/, '')
    } else {
      filePath = './' + file
    }

    readFile(path.join(__dirname, '../lib/' + file), function (err, res) {
      assert.ifError(err)
      var tmpl = expand(res, opts.meta)
      writeFile(filePath, tmpl, function (err) {
        assert.ifError(err)
        display.event('create:', file, 'white')
        process.nextTick(function () {
          return next(null)
        })
      })
    })
  }, function (err, results) {
    assert.ifError(err)
    cb(null)
  })
}

module.exports = tmpls
