const slice = require('../src/utils').sliced
const clrz  = require('colorz')
const clog  = require('json-colorz')

// clrz settings for colorized output
const blk = clrz.black
const dim = clrz.dim
const blu = clrz.blue
const grn = clrz.green
const mag = clrz.magenta
const red = clrz.red

module.exports = {
  logger: function () {
    var args = slice(arguments).join(' ') + '\n'
    return process.stdout.write(args)
  },

  dry: function (conf) {
    clog(conf)
  },

  log: function (conf) {
    // log metadata to stdout
    var opts = conf.meta
    var chkrmt = (opts.type === 'public' && opts.remote !== false)
    var chkpsh = opts.type === 'public' && opts.remote && opts.push
    var chktyp = opts.type === 'public' && opts.noRemote
      ? 'public but no remote'
      : opts.type

    this.logger()
    this.logger(blu(opts.date))
    this.logger()
    this.logger(dim(blk('---------------------------------------')))
    this.logger(grn('  user  :'), mag(opts.author + ' (' + opts.name + ')'))
    this.logger(grn('  email :'), mag(opts.email))
    this.logger(dim(blk('  ----------------')))
    this.logger(grn('  name        :'), mag(opts.packageName))
    this.logger(grn('  version     :'), mag(opts.version))
    this.logger(grn('  type        :'), mag(chktyp))
    this.logger(grn('  repository  :'), mag(opts.repo))
    this.logger(grn('  command     :'), mag(chkrmt ? opts.remote : 'none'))
    this.logger(grn('  remote      :'), mag(chkrmt))
    this.logger(grn('  push        :'), mag(chkpsh))
    this.logger(dim(blk('  ----------------')))
    this.logger(grn('  license     :'), mag(opts.license))
    this.logger(grn('  description :'), mag(opts.description))
    this.logger(grn('  packages    :'), mag(conf.install
      ? conf.packages.concat(conf.devpackages).join(', ')
      : 'none'
    ))
    // this.logger(grn('  tags        : ') + mag(opts.tags))
    this.logger(dim(blk('---------------------------------------')))
  },

  done: function () {
    this.logger()
    this.logger(mag('All done.'))
  },

  heading: function (title) {
    this.logger()
    this.logger(blu(title))
    this.logger()
  },

  event: function (label, text, clr) {
    this.logger(dim(blk('  ' + label + '  ')), clrz[clr](text))
  },

  error: function (err) {
    process.stderr.write(err + '\n')
    process.exit(1)
  },

  stderr: function (text, module) {
    this.logger(dim(blk('error message: ')), grn(module))
    this.logger(red(text))
  },

  stdout: function (label, text) {
    this.logger(dim(blk(label)))
    this.logger(grn(text))
  }
}
