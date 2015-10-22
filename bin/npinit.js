#!/usr/bin/env node
const argv = require('argh').argv
const proc = require('../')

function npinit () {
  // usage, version and projectName
  const noCommands = process.argv.length <= 2 && process.stdin.isTTY
  const noProjName  = argv.argv === undefined || process.argv[2] !== argv.argv[0]
  const chk4help = (argv.argv !== undefined && argv.argv[0] === 'help') || argv.h || argv.help
  const chk4test  = (argv.argv !== undefined && argv.argv[0] === 'test')
  const chk4vers = argv.v || argv.version

  // usage
  if (noCommands || (noProjName && !chk4vers) || chk4help) usage()

  // version
  if (chk4vers) vers()

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
  // ///////////////////////////////////////////////////////////////////////////////
  function usage () {
    console.log(function () {
    /*

    Usage: npinit <packageName> [options]
           npinit <packageName> --dry [options]
           npinit -n [options]
           npinit -dry [options]

    Options:

      -h, --help          output usage information

      -v, --version       output the version number

      --dry               dry run displaying metadata used for generation

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

      --remote            process will use the generic git command:

                            `git remote add origin https://github.com/username/repo.git`

                          username and repo will be automactically added. Leaving this
                          option off will use `hub` (https://github.com/github/hub)
                          to createthe remote repository. [default command `hub create`].
                          You will have to enter your github username and password
                          if NOT using the --noPush option.

      --no-remote         do not create a remote repository on github. no-remote
                          will not push a repo to github.
                          it will also override the default remote command `hub create`
                          if addRemote is not present when creating a public module
                          with flags -g or --github.

      -P, --noPush        do not push repository to github. use only with
                          flags -g or --github [default is push]

      --D <string>        a list of node modules to install, i.e.,
                          `--D "lodash moment"` or `--D "lodash, moment"`.
                          [npm i --save packages]

      --d <string>        a list of node dev modules to install, i.e.,
                          `--d "tape istanbul"` or `--d "tape, istanbul"`.
                          [npm i --save-dev devpackages]

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

  function projName () {
    if (chk4test) return makePkgName(true)
    else return makePkgName(false)
  }

  function makePkgName (choice) {
    var testName = 'test-' + Math.floor(Math.random() * (1000 - 101) + 101)

    switch (choice) {
      case false:
        var tmp = argv.argv[0].toString()
        if (tmp.length === 0) return testName
        return slug(argv.argv[0])
      case true: return testName
    }
  }

  function slug (str) {
    return str.replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').replace(/^-/g, '').toLowerCase()
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
    return str.toLowerCase().replace(/\,/g, '').split(' ')
  }
}

npinit()
