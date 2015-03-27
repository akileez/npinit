const assert = require('assert')
const exec   = require('child_process').exec
const moment = require('moment')
const chalk  = require('chalk')

module.exports = makeConfig

// chalk settings for colorized output
var blk = chalk.dim.black
var blu = chalk.blue
var grn = chalk.green
var mag = chalk.magenta

// create configuration
function makeConfig (conf, cb) {
  conf = getDate(conf);
  whoami(conf, function (name) {
    conf.meta.name   = conf.inputs.user || name
    conf.meta.author = conf.inputs.author || conf.meta.author
    conf.meta.email  = conf.inputs.email || conf.meta.email
    log(conf)
    cb(conf)
  })
}

// get date
function getDate (conf) {
  conf.meta.date    = moment().format('dddd, MMMM Do YYYY, h:mm:ss A [GMT]Z [(EST)]')
  conf.meta.year    = moment().format('YYYY')
  return conf
}

// get user info
function whoami (conf, cb) {
  exec('npm whoami', function (err, name) {
    assert.ifError(err)
    name = name.replace(/(\n)/gm, '')
    cb(name)
  })
}

// log meta to stdout
function log (conf) {
  process.stdout.write('\n')
  process.stdout.write(blu(conf.meta.date + '\n'))
  process.stdout.write('\n')
  process.stdout.write(blk('--------------------------------------- \n'))
  process.stdout.write(grn('  user: ') + mag(conf.meta.author + ' (' + conf.meta.name + ')') + '\n')
  process.stdout.write(grn('  mail: ') + mag(conf.meta.email) + '\n')
  process.stdout.write(grn('  proj: ') + mag(conf.meta.packageName) + '\n')
  process.stdout.write(grn('  vers: ') + mag(conf.meta.version) + '\n')
  process.stdout.write(grn('  type: ') + mag(conf.meta.type) + '\n')
  process.stdout.write(grn('  repo: ') + mag(conf.meta.repo) + '\n')
  process.stdout.write(grn('  lics: ') + mag(conf.meta.license) + '\n')
  process.stdout.write(grn('  desc: ') + mag(conf.meta.description) + '\n')
  process.stdout.write(grn('  tags: ') + mag(conf.meta.tags) + '\n')
  process.stdout.write(blk('---------------------------------------'))
  process.stdout.write('\n')
}
