#!/usr/bin/env node
const argv = require('argh').argv;
const fs   = require('fs');
const meta = require('./meta');
const cc   = require('change-case');
const clog = require('jsome');
const init = require('../');

process.stdout.on('error', process.exit);
// console.log(argv.argv)

// help
const noCommands = process.argv.length <= 2 && process.stdin.isTTY;

if ((argv.argv !== undefined && argv.argv[0] === 'help') || argv.h || argv.help || noCommands) {
  process.stdout.write(fs.readFileSync(__dirname + '/usage.txt', 'utf-8') + '\n')
  process.exit(0)
}

// version
if (argv.v || argv.version) {
  process.stdout.write(require('../package.json').version + '\n')
  process.exit(0)
}

if (argv.argv) {
  var projName = cc.paramCase(argv.argv[0]).replace(/\//g, '-');
} else {
  var projName = 'testproj' + Math.floor(Math.random() * (1000 - 101) + 101) ;
}

// default options
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
    packageName: projName,
    type: 'private',
    repo: 'none'
  },
  inputs: {
    license: '',
    author: '',
    email: ''
  }
};

if (argv.desc || argv.description) {
  opts.meta.description = argv.desc || argv.description;
} else {
  opts.meta.description = 'No description given'
}

if (argv.tags) {
  opts.meta.tags = argv.tags.split()
} else {
  opts.meta.tags = "none"
}

if (argv.g || argv.git) {
  opts.git = true
  opts.meta.repo = 'init'
  opts.files.gitignore = true
}

if (argv.p || argv.public ) {
  opts.meta.type = "public"
  opts.files.license = true
  opts.files.travis = true
  opts.files.gitignore = true
  opts.git = true
  opts.meta.repo = 'init'
}

if (argv.license) opts.inputs.license = argv.license
if (argv.author)  opts.inputs.author = argv.author
if (argv.email)   opts.inputs.email = argv.email

meta(opts, function (nwOpts) {
  if (argv.d || argv.dry) {
    clog(nwOpts);
  } else {
    // init(nwOpts);
  }
});