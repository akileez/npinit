#!/usr/bin/env node
const argv = require('argh').argv
const fs   = require('fs')
const meta = require('../lib/meta')
const dasher = require('lodash/string/kebabCase')
const clog = require('jsome')
const init = require('../')
const exec   = require('child_process').exec
const assert = require('assert')

// process.stdout.on('error', process.exit)
// console.log(argv)

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

// package name
if (argv.argv) {
  var projName = dasher(argv.argv[0]).replace(/\//g, '-')
} else if (argv.n || argv.new || argv.d || argv.dry) {
  var projName = 'testproj' + Math.floor(Math.random() * (1000 - 101) + 101)
} else {
  process.stdout.write(fs.readFileSync(__dirname + '/usage.txt', 'utf-8') + '\n')
  process.exit(0)
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
    version: '0.1.0',
    license: 'MIT',
    repo: 'null'
  },
  inputs: {
    author: '',
    email: '',
    user: ''
  }
}

// user information
author(opts, function (author) {
  opts.meta.author = author
})
email(opts, function (email) {
  opts.meta.email = email
})

function author (conf, cb) {
  exec('npm config get init.author.name', function (err, author) {
    assert.ifError(err)
    author = author.replace(/(\n)/gm, '')
    cb(author)
  })
}

function email (conf, cb) {
  exec('npm config get init.author.email', function (err, email) {
    assert.ifError(err)
    email = email.replace(/(\n)/gm, '')
    cb(email)
  })
}

// git repo initialization
if (argv.g || argv.git) {
  opts.git = true
  opts.meta.repo = 'init'
  opts.files.gitignore = true
}

// public repo
if (argv.p || argv.public ) {
  opts.meta.type = "public"
  opts.files.license = true
  opts.files.travis = true
  opts.files.gitignore = true
  opts.git = true
  opts.meta.repo = 'init'
}

// description for package.json
if (argv.desc || argv.description) {
  opts.meta.description = argv.desc || argv.description;
} else {
  opts.meta.description = 'null'
}

// tags for package.json
if (argv.tags) {
  opts.meta.tags = argv.tags.split()
} else {
  opts.meta.tags = 'null'
}

// optional overrides
if (argv.license) opts.meta.license = argv.license
if (argv.pkgv)    opts.meta.version = argv.pkgv
if (argv.author)  opts.inputs.author = argv.author
if (argv.email)   opts.inputs.email = argv.email
if (argv.user)    opts.inputs.user  = argv.user


// getDate and npm user then create project
meta(opts, function (nwOpts) {
  if (argv.d || argv.dry) {
    clog(nwOpts);
  } else {
    // init(nwOpts);
  }
});