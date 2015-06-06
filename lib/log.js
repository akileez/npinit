const clrz = require('colorz')

module.exports = log

// clrz settings for colorized output
var blk = clrz.black
var dim = clrz.dim
var blu = clrz.blue
var grn = clrz.green
var mag = clrz.magenta

// log meta to stdout
function log (conf) {
  var opts = conf.meta
  var chkrmt = opts.type === 'public' && !opts.noRemote
  var chkpsh = opts.type === 'public' && !opts.noRemote && !opts.noPush
  var chktyp = opts.type === 'public' && opts.noRemote ? 'public but no remote' : opts.type

  process.stdout.write('\n')
  process.stdout.write(blu(conf.meta.date + '\n'))
  process.stdout.write('\n')
  process.stdout.write(dim(blk('--------------------------------------- \n')))
  process.stdout.write(grn('  user  : ') + mag(opts.author + ' (' + opts.name + ')') + '\n')
  process.stdout.write(grn('  email : ') + mag(opts.email) + '\n')
  process.stdout.write(dim(blk('  ---------------- \n')))
  process.stdout.write(grn('  name        : ') + mag(opts.packageName) + '\n')
  process.stdout.write(grn('  version     : ') + mag(opts.version) + '\n')
  process.stdout.write(grn('  type        : ') + mag(chktyp) + '\n')
  process.stdout.write(grn('  repository  : ') + mag(opts.repo) + '\n')
  process.stdout.write(grn('  command     : ') + mag(opts.remoteCmd) + '\n')
  process.stdout.write(grn('  remote      : ') + mag(chkrmt) + '\n')
  process.stdout.write(grn('  push        : ') + mag(chkpsh) + '\n')
  process.stdout.write(dim(blk('  ---------------- \n')))
  process.stdout.write(grn('  license     : ') + mag(opts.license) + '\n')
  process.stdout.write(grn('  description : ') + mag(opts.description) + '\n')
  process.stdout.write(grn('  packages    : ') + mag(conf.install ? conf.packages.concat(conf.devpackages).join(', ') : 'none') + '\n')
  // process.stdout.write(grn('  tags        : ') + mag(opts.tags) + '\n')
  process.stdout.write(dim(blk('---------------------------------------')))
  process.stdout.write('\n')
}
