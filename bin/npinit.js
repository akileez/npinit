#!/usr/bin/env node
const fs = require('fs')
const assert = require('assert')
const argv = require('argh').argv
const clog = require('jsome')
const moment = require('moment')
const dasher = require('lodash/string/kebabCase')
const init = require('../')
const log = require('../lib/log')
const meta = require('../lib/meta')
const timeout = require('../lib/timeout')
const version = require('../package.json').version

// checks for help
// ///////////////////////////////////////////////////////////////////////////////
const noCommands = process.argv.length <= 2 && process.stdin.isTTY
const chk4help = (argv.argv !== undefined && argv.argv[0] === 'help') || argv.h || argv.help
const chknord = argv.n || argv.new || argv.d || argv.dry

// usage
if (chk4help || noCommands) usage()

// version
if (argv.v || argv.version) vers()

// package name
if (argv.argv) var projName = makePkgName(false)
else if (chknord) var projName = makePkgName(true)
else usage()

function usage () {
  process.stdout.write(fs.readFileSync(__dirname + '/usage.txt', 'utf-8') + '\n')
  process.exit(0)
}

function vers () {
  process.stdout.write(version + '\n')
  process.exit(0)
}

function makePkgName (choice) {
  switch (choice) {
    case false: return dasher(argv.argv[0])
    case true: return 'testproj' + Math.floor(Math.random() * (1000 - 101) + 101)
  }
}

// default options
// ///////////////////////////////////////////////////////////////////////////////
var opts = {
  install: true,
  git: false,
  files: {
    gitignore: false,
    index: true,
    license: false,
    package: true,
    readme: true,
    test: true,
    travis: false
  },
  meta: {
    date: moment().format('dddd, MMMM Do YYYY, h:mm:ss A [GMT]Z'),
    year: moment().format('YYYY'),
    packageName: projName,
    type: 'private',
    version: '0.1.0',
    license: 'MIT',
    repo: 'null',
    push: false
  }
}

// option configuration
// ///////////////////////////////////////////////////////////////////////////////

// git repo initialization
if (argv.r || argv.repo) {
  opts.git = true
  opts.meta.repo = 'init'
  opts.files.gitignore = true
}

// chedk for private and public projects being created together
const pubpriv = (argv.g || argv.github) && (argv.n || argv.new)
const pub = (argv.g || argv.github)

// public repo
if (!pubpriv && pub) {
  opts.meta.type = 'public'
  opts.files.license = true
  opts.files.travis = true
  opts.files.gitignore = true
  opts.git = true
  opts.meta.repo = 'init'
  opts.meta.push = argv.noPush ? false : true
}

// description for package.json
const description = argv.desc || argv.description
if (description) opts.meta.description = description
else opts.meta.description = 'null'

// tags for package.json
if (argv.tags) opts.meta.tags = argv.tags.split()
else opts.meta.tags = 'null'

// get user information, display options & initialize project
// ///////////////////////////////////////////////////////////////////////////////

meta(opts, function (nwOpts) {
  timeout(25)(function () {
    log(nwOpts)
    if (argv.d || argv.dry) {
        process.stdout.write('\n')
        process.stdout.write('\x1b[36mOptions:\x1b[0m ')
        process.stdout.write('\n\n')
        clog(nwOpts)
      } else {
        // init(nwOpts)
      }
  })
})
