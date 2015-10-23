#!/usr/bin/env node
const argv  = require('argh').argv
const usage = require('./usage')
const proc  = require('../')

function npinit () {
  // usage, version and projectName
  const noCommands = process.argv.length <= 2 && process.stdin.isTTY

  const noProjName = (argv.argv === undefined || process.argv[2] !== argv.argv[0])
    && !(argv.v || argv.version)

  const chk4help = argv.argv !== undefined
    && argv.argv[0] === 'help'
    || argv.h
    || argv.help

  const chk4test = argv.argv !== undefined
    && argv.argv[0] === 'test'

  // usage
  if (noCommands || noProjName || chk4help) usage()

  // version
  if (argv.v || argv.version) vers()

  // default options
  var opts = {
    install: false,
    devpackages: [],
    packages: [],
    git: false,
    verbose: false,
    dryrun: false,
    files: {
      gitignore: false,
      eslintrc: true,
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
      remote: false,
      push: false,
      author: argv.author,
      email: argv.email,
      name: argv.user,
      url: argv.url,
      version: argv.pkgv,
      license: argv.license
    }
  }

  if (argv.verbose) opts.verbose = true
  if (argv.dry || argv.d) opts.dryrun = true

  // git repository configuration
  // check for private and public projects being created together
  const pub = (argv.g || argv.github)
  const priv = (argv.r || argv.repo)

  // public repo if option -g or -github
  if (!priv && pub) {
    opts.meta.type = 'public'
    opts.meta.remote = 'hubCreate'
    opts.meta.push = true
    opts.files.license = true
    opts.files.travis = true
    repo()
    chkRemote()
  }

  // private repo options:
  // together: -g or --github and -r or --repo
  //  or just: -r or --repo
  if ((priv && pub) || priv) repo()

  // install dependencies configuration
  // check for user install dependencies
  if (argv.dev) devpackages()
  if (argv.dep) packages()

  // misc overrides
  const description = argv.desc || argv.description
  if (description) opts.meta.description = description
  else opts.meta.description = 'An awesome module being created'

  // tags for package.json
  // if (argv.tags) opts.meta.tags = makeArray(argv.tags)
  // else opts.meta.tags = ''

  // get user information, display options & initialize project
  return proc(opts)

  // configuration functions
  // ///////////////////////

  function vers () {
    process.stdout.write(require('../package.json').version + '\n')
    process.exit(0)
  }

  function projName () {
    if (chk4test) return 'test-' + Math.floor(Math.random() * (1000 - 101) + 101)
    else return slug(argv.argv[0].toString())
  }

  // configure private git repository
  function repo () {
    opts.git = true
    opts.meta.repo = 'init'
    opts.files.gitignore = true
  }

  function chkRemote () {
    if (argv.remote) {
      opts.meta.remote = 'addRemote'
    } else if (argv.remote === false) {
      opts.meta.type = 'private'
      opts.meta.remote = false
      opts.meta.push = false
    }
  }

  // configure user installed devDependencies
  function devpackages () {
    opts.devpackages = makeArray(argv.dev)
    opts.files.test = true
    opts.install = true
  }

  // configure user installed dependencies
  function packages () {
    opts.packages =  makeArray(argv.dep)
    opts.install = true
  }

  function makeArray (str) {
    return str
      .toLowerCase()
      .replace(/\,/g, '')
      .split(' ')
  }

  function slug (str) {
    return str
      .replace(/([A-Z])/g, '-$1')
      .replace(/[-_\s]+/g, '-')
      .replace(/^-/g, '')
      .toLowerCase()
  }
}

npinit()
