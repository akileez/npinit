const mustache = require('mustache')
const path = require('path')
const fs = require('fs')
const clrz = require('colorz')

module.exports = write

const blk = clrz.black
const dim = clrz.dim
const wht = clrz.white

// Echo str > filePath.
// @param {String} filePath
// @param {String} str
function write (opts) {
  return function (filePath, str) {
    str = fs.readFileSync(path.join(__dirname, str), 'utf-8')
    var mt = mustache.render(str, opts)
    fs.writeFile(filePath, mt, function (err) {
      if (err) {
        process.stderr.write(err + '\n')
        process.exit(1)
      }
      process.stdout.write(dim(blk('  create:  ')) + wht(filePath) + '\n')
    })
  }
}
