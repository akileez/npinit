var clrz = require('colorz')

// clrz settings for colorized output
var blk = clrz.black
var dim = clrz.dim
var blu = clrz.blue
var mag = clrz.magenta
var yel = clrz.yellow
var red = clrz.red
var grn = clrz.green
var gry = clrz.grey
var cyn = clrz.cyan

module.exports = {
  info: function (msg) {
    process.stdout.write(blu(msg))
  },

  event: function (description, item) {
    process.stdout.write(dim(blk(description)) + red(item) + '\n')
  },

  done: function (process, predicate) {
    // process.stdout.write(mag(predicate))
  },

  msgdone: function () {
    process.stdout.write(mag('\nAll done.\n'))
  }
}