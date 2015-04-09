#!/usr/bin/env node
const argv = require('argh').argv
const clog = require('jsome')
const moment = require('moment')
const slug = require('lodash.kebabcase')
const init = require('../')
const log = require('../lib/log')
const meta = require('../lib/meta')

// checks for help
// ///////////////////////////////////////////////////////////////////////////////
const noCommands = process.argv.length <= 2 && process.stdin.isTTY
const chk4help = (argv.argv !== undefined && argv.argv[0] === 'help') || argv.h || argv.help
const chkstate = argv.n || argv.new || argv.d || argv.dry

// usage
if (chk4help || noCommands) usage()

// version
if (argv.v || argv.version) vers()

// package name
if (argv.argv) var projName = makePkgName(false)
else if (chkstate) var projName = makePkgName(true)
else usage()

function usage () {
  console.log(function () {
    /*

    Usage: npinit <packageName> [options]
           npinit -n [options]
           npinit -d [options]

    Options:

      -h, --help          output usage information

      -v, --version       output the version number

      -n, --new           new private module. for use without a packageName. the default
                          packageName `testproj###` will be assigned. random number `###`
                          generated to avoid potential conflicts.

      -g, --github        new public module. a git repository will be
                          automactically initialized and pushed to gihub. a packageName
                          is required. [default mode is private module, no git repo]

      -d, --dry           dry run displaying metadata used for generation

      -r, --repo          initialize a git repository when generating a private module
                          [default is none]

      --addRemote         process will use the generic git command:

                              `git remote add origin https://github.com/username/repo.git`

                          username and repo will be automactically added. You will have
                          to enter your github username and password. Leaving this option
                          off will use `hub` (https://github.com/github/hub) to create
                          the remote repository. [default command `hub create`]

      --noRemote          do not create a remote repository on github. noRemote assumes noPush
                          and will override addRemote if both are present. it will also override
                          the default remote command `hub create` if addRemote is not present
                          when creating a public module with flags -g or --github.

      --noPush            do not push repository to github. use only with flags -g or --github
                          [default is push]

      --desc <string>     description for package.json and github repository if using `hub`.
                          enclose the string in quotes, i.e., "This is an awesome project"

      --tags <string>     keywords for package.json. use a comma separate list of items
                          i.e., "apple, orange, pear"

    Overrides:

      --author  <string>  author name for project. [default reads from .npmrc or 'Your Name']
      --email   <string>  email for project. [default reads from .npmrc or 'your@email.com']
      --user    <string>  github username [default reads from .npmrc or 'githubName']
      --license <string>  license type for project. [default reads from .npmrc => ISC]
      --pkgv    <string>  semantic version for project [default reads from .npmrc => 1.0.0]

    */
  }.toString().split(/\n/).slice(2, -2).join('\n'))
  process.exit(0)
}

function vers () {
  process.stdout.write(require('../package.json').version + '\n')
  process.exit(0)
}

function makePkgName (choice) {
  switch (choice) {
    case false: return slug(argv.argv[0])
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
    repo: 'none',
    remoteCmd: 'none',
    noPush: false,
    noRemote: false
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

// check for private and public projects being created together
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
  chkRemote()
}

function chkRemote () {
  if (argv.noRemote) {
    opts.meta.noRemote = true
    opts.meta.noPush = true
    opts.meta.remoteCmd = 'no public repository'
  } else {
    opts.meta.noRemote = false
    opts.meta.noPush = argv.noPush ? true : false
    opts.meta.remoteCmd = argv.addRemote ? "addRemote" : "hubCreate"
  }
}

// description for package.json
const description = argv.desc || argv.description
if (description) opts.meta.description = description
else opts.meta.description = 'An awesome module being created'

// tags for package.json
if (argv.tags) opts.meta.tags = argv.tags.split()
else opts.meta.tags = 'null'

// get user information, display options & initialize project
// ///////////////////////////////////////////////////////////////////////////////

meta(opts, function (nwOpts) {
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
