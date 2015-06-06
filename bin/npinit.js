#!/usr/bin/env node
const argv = require('argh').argv
const clog = require('jsome')
const clrz = require('colorz')
const slug = require('lodash.kebabcase')
const init = require('../')
const log = require('../lib/log')
const meta = require('../lib/meta')

// usage, version and projectName
// ///////////////////////////////////////////////////////////////////////////////
const noCommands = process.argv.length <= 2 && process.stdin.isTTY
const chk4help = (argv.argv !== undefined && argv.argv[0] === 'help') || argv.h || argv.help
const chkstate = argv.n || argv.new || argv.dry

// usage
if (chk4help || noCommands) usage()

// version
if (argv.v || argv.version) vers()

// default options
// ///////////////////////////////////////////////////////////////////////////////
var opts = {
  install: false,
  devpackages: [],
  packages: [],
  git: false,
  files: {
    gitignore: false,
    index: true,
    license: false,
    package: true,
    readme: true,
    test: false,
    travis: false
  },
  meta: {
    date: new Date().toLocaleString(),
    year: new Date().getFullYear().toString(),
    packageName: projName(),
    type: 'private',
    repo: 'none',
    remoteCmd: 'none',
    noPush: false,
    noRemote: false
  }
}

// git repository configuration
// ///////////////////////////////////////////////////////////////////////////////

// git repo initialization
if (argv.r || argv.repo) repo()

// check for private and public projects being created together
const pubpriv = (argv.g || argv.github) && (argv.n || argv.new)
const pub = (argv.g || argv.github)

// public repo if option -g or -github
if (!pubpriv && pub) {
  opts.meta.type = 'public'
  opts.files.license = true
  opts.files.travis = true
  repo()
  chkRemote()
  remotecommand()
}

// private repo if options -g or --github and -n together
if (pubpriv && pub) repo()

// install dependencies configuration
// ///////////////////////////////////////////////////////////////////////////////
// check for user install dependencies
if (argv.d && argv.d !== true) devpackages()
if (argv.D && argv.D !== true) packages()

// misc overrides
// ///////////////////////////////////////////////////////////////////////////////
const description = argv.desc || argv.description
if (description) opts.meta.description = description
else opts.meta.description = 'An awesome module being created'

// tags for package.json
// if (argv.tags) opts.meta.tags = argv.tags.split()
// else opts.meta.tags = ''

// get user information, display options & initialize project
// ///////////////////////////////////////////////////////////////////////////////
meta(opts, function (nwOpts) {
  log(nwOpts)
  if (argv.dry) {
    process.stdout.write('\n')
    process.stdout.write(clrz.cyan('Options'))
    process.stdout.write('\n\n')
    clog(nwOpts)
  } else {
    init(nwOpts)
  }
})

// configuration functions
// ///////////////////////////////////////////////////////////////////////////////
function usage () {
  return require('../lib/usage')()
}

function vers () {
  process.stdout.write(require('../package.json').version + '\n')
  process.exit(0)
}

function projName () {
  if (argv.argv) return makePkgName(false)
  if (chkstate) return makePkgName(true)
  usage()
}

function makePkgName (choice) {
  var testName = 'testproj' + Math.floor(Math.random() * (1000 - 101) + 101)

  switch (choice) {
    case false:
      var tmp = argv.argv[0].toString()
      if (tmp.length === 0) return testName
      return slug(argv.argv[0])
    case true: return testName
  }
}

// configure private git repository
function repo () {
  opts.git = true
  opts.meta.repo = 'init'
  opts.files.gitignore = true
}

function chkRemote () {
  if (argv.noRemote || argv.R) {
    opts.meta.noRemote = true
    opts.meta.noPush = true
  } else {
    opts.meta.noRemote = false
    opts.meta.noPush = argv.noPush || argv.P ? true : false
  }
}

function remotecommand () {
  opts.meta.remoteCmd = 'hubCreate'
  if (argv.addRemote) opts.meta.remoteCmd = 'addRemote'
  if (argv.noRemote || argv.R) opts.meta.remoteCmd = 'no public repository'
}

// configure user installed devDependencies
function devpackages () {
  opts.devpackages = makeArray(argv.d)
  opts.files.test = true
  opts.install = true
}

// configure user installed dependencies
function packages () {
  opts.packages =  makeArray(argv.D)
  opts.install = true
}

function makeArray (str) {
  return str.toLowerCase().replace(/\,/g, '').split(' ')
}
