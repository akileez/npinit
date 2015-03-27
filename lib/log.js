const chalk = require('chalk')

module.exports = log

// chalk settings for colorized output
var blk = chalk.dim.black
var blu = chalk.blue
var grn = chalk.green
var mag = chalk.magenta

// log meta to stdout
function log (conf, cb) {
  process.stdout.write('\n')
  process.stdout.write(blu(conf.meta.date + '\n'))
  process.stdout.write('\n')
  process.stdout.write(blk('--------------------------------------- \n'))
  process.stdout.write(grn('  user: ') + mag(conf.meta.author + ' (' + conf.meta.name + ')') + '\n')
  process.stdout.write(grn('  mail: ') + mag(conf.meta.email) + '\n')
  process.stdout.write(blk('---------------- \n'))
  process.stdout.write(grn('  proj: ') + mag(conf.meta.packageName) + '\n')
  process.stdout.write(grn('  vers: ') + mag(conf.meta.version) + '\n')
  process.stdout.write(grn('  type: ') + mag(conf.meta.type) + '\n')
  process.stdout.write(grn('  repo: ') + mag(conf.meta.repo) + '\n')
  process.stdout.write(grn('  push: ') + mag(conf.meta.push) + '\n')
  process.stdout.write(blk('---------------- \n'))
  process.stdout.write(grn('  lics: ') + mag(conf.meta.license) + '\n')
  process.stdout.write(grn('  desc: ') + mag(conf.meta.description) + '\n')
  process.stdout.write(grn('  tags: ') + mag(conf.meta.tags) + '\n')
  process.stdout.write(blk('---------------------------------------'))
  process.stdout.write('\n')
  cb(conf)
}
