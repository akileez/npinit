#!/usr/bin/env node
const argv = require('argh').argv
const clog = require('jsome')
const slug = require('lodash.kebabcase')
const words = require('lodash.words')
const init = require('../')
const log = require('../lib/log')
const meta = require('../lib/meta')

// usage, version and projectName
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

    -d, --dry           dry run displaying metadata used for generation

    -n, --new           new private module. for use without a packageName. the default
                        packageName `testproj###` will be assigned. random number `###`
                        generated to avoid potential conflicts.

    -g, --github        new public module. a git repository will be
                        automactically initialized and pushed to gihub. a packageName
                        is required. [default mode is private module, no git repo]
                        running option -n or --new with -g or --github is equivalent to
                        option `-nr` or `--new --repo` initializing a new private
                        module with a git repository. packageName will not be required.
                        options --addRemote, --noRemote and --noPush are inactive in
                        this mode when `-ng` are run together.

    -r, --repo          initialize a git repository when generating a private module
                        [default is none]

    --addRemote         process will use the generic git command:

                          `git remote add origin https://github.com/username/repo.git`

                        username and repo will be automactically added. Leaving this
                        option off will use `hub` (https://github.com/github/hub)
                        to createthe remote repository. [default command `hub create`].
                        You will have to enter your github username and password
                        if NOT using the --noPush option.

    -R, --noRemote      do not create a remote repository on github. noRemote
                        assumes noPush and will override addRemote if both are present.
                        it will also override the default remote command `hub create`
                        if addRemote is not present when creating a public module
                        with flags -g or --github.

    -P, --noPush        do not push repository to github. use only with
                        flags -g or --github [default is push]

    -D, --noDeps        do not install default dependencies.
                        [defaults: `npm i mocha standard --save-dev`]

    --packs <string>    a list of node modules to install, i.e.,
                        `--packs "lodash moment"` or `--packs "lodash, moment"`.
                        this option is independent from no-dependencies option
                        -D or --noDeps. [npm i --save packages]

    --devpacks <string> a list of node dev modules to install, i.e.,
                        `--devpacks "tape istanbul"` or `--devpacks "tape, istanbul"`.
                        this option is independent from no-dependencies option
                        -D or --noDeps. [npm i --save-dev devpackages]

  Overrides:

    --desc    <string>  description for package.json and github repository if using `hub`.
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
  devInstall: true,
  proInstall: false,
  devpackages: ['standard', 'mocha'],
  packages: [],
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
    date: new Date().toLocaleString(),
    year: new Date().getFullYear().toString(),
    packageName: projName,
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

// configure private git repository
function repo () {
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
  repo()
  chkRemote()
}

// private repo if options -g or --github and -n together
if (pubpriv && pub) repo()

// configure remote options
function chkRemote () {
  if (argv.noRemote || argv.R) {
    opts.meta.noRemote = true
    opts.meta.noPush = true
    opts.meta.remoteCmd = 'no public repository'
  } else {
    opts.meta.noRemote = false
    opts.meta.noPush = argv.noPush || argv.P ? true : false
    opts.meta.remoteCmd = argv.addRemote ? 'addRemote' : 'hubCreate'
  }
}

// install dependencies configuration
// ///////////////////////////////////////////////////////////////////////////////
// turn off default devDependencies
if (argv.noDeps || argv.D) {
  opts.install = false
  opts.devInstall = false
  opts.files.test = false
}
// check for user install dependencies
if (argv.devpacks) devpackages()
if (argv.packs) packages()

// configure user installed devDependencies
function devpackages () {
  opts.devpackages = opts.devpackages.concat(words(argv.devpacks))
  if (argv.noDeps || argv.D) {
    opts.devpackages = words(argv.devpacks)
    opts.install = true
    opts.devInstall = true
    opts.files.test = true
  }
}

// configure user installed dependencies
function packages () {
  opts.packages = words(argv.packs)
  opts.proInstall = true
  if (argv.noDeps || argv.D) {
    opts.install = true
  }
}

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
  if (argv.d || argv.dry) {
    process.stdout.write('\n')
    process.stdout.write('\x1b[36mOptions:\x1b[0m ')
    process.stdout.write('\n\n')
    clog(nwOpts)
  } else {
    init(nwOpts)
  }
})
