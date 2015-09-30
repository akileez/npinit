const expand    = require('toolz/src/string/expand')
const iterate   = require('toolz/src/async/iterate')
const readFile  = require('toolz/src/file/readFile')
const writeFile = require('toolz/src/file/writeFile')
const display   = require('./display')
const path      = require('path')
const fs        = require('fs')
const assert    = require('assert')

function tmpls (opts, cb) {
  var tmpl = opts.files
  const license = opts.meta.license
  var files = []

  Object.keys(tmpl).forEach(function (name) {
    if (tmpl[name]) {
      if (name === 'gitignore') return files.push(name)
      if (name === 'index' || name === 'test') return files.push(name + '.js')
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

  display.heading('Templates')

  iterate.each(files, function (file, key, done) {
    if (file === 'gitignore' || file === 'travis.yml') {
      filePath = './.' + file
    } else {
      filePath = './' + file
    }

    readFile(path.join(__dirname, '../lib/' + file), function (err, res) {
      assert.ifError(err)
      var tmpl = expand(res, opts.meta)
      writeFile(filePath, tmpl, function (err) {
        assert.ifError(err)
        display.event('create:', file, 'white')
        done(null)
      })
    })
  }, function (err, results) {
    assert.ifError(err)
    cb(null)
  })
}

module.exports = tmpls
