var clrz = require('colorz')
var log = console.log.bind(console)

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
    // process.stdout.write(blu('\nDependencies:\n\n'))
  },

  event: function (description, item) {
    // process.stdout.write(dim(blk('  module: ')) + red(item) + '\n')
  },

  done: function (process, predicate) {

  }
}