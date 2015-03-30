const chalk = require('chalk')

module.exports = log

// chalk settings for colorized output
var blk = chalk.dim.black
var blu = chalk.blue
var grn = chalk.green
var mag = chalk.magenta

// log meta to stdout
function log (conf) {
  process.stdout.write('\n')
  process.stdout.write(blu(conf.meta.date + '\n'))
  process.stdout.write('\n')
  process.stdout.write(blk('--------------------------------------- \n'))
  process.stdout.write(grn('  user  : ') + mag(conf.meta.author + ' (' + conf.meta.name + ')') + '\n')
  process.stdout.write(grn('  email : ') + mag(conf.meta.email) + '\n')
  process.stdout.write(blk('  ---------------- \n'))
  process.stdout.write(grn('  project name   : ') + mag(conf.meta.packageName) + '\n')
  process.stdout.write(grn('  version        : ') + mag(conf.meta.version) + '\n')
  process.stdout.write(grn('  project type   : ') + mag(conf.meta.type) + '\n')
  process.stdout.write(grn('  repository     : ') + mag(conf.meta.repo) + '\n')
  process.stdout.write(grn('  create remote  : ') + mag(!conf.meta.noRemote) + '\n')
  process.stdout.write(grn('  remote command : ') + mag(conf.meta.remoteCmd) + '\n')
  process.stdout.write(grn('  push to remote : ') + mag(!conf.meta.noPush) + '\n')
  process.stdout.write(blk('  ---------------- \n'))
  process.stdout.write(grn('  license     : ') + mag(conf.meta.license) + '\n')
  process.stdout.write(grn('  description : ') + mag(conf.meta.description) + '\n')
  process.stdout.write(grn('  tags        : ') + mag(conf.meta.tags) + '\n')
  process.stdout.write(blk('---------------------------------------'))
  process.stdout.write('\n')
}
