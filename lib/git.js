const exec = require('child_process').exec
const assert = require('assert')
const chalk = require('chalk')
const tim = require('./timeout')

module.exports = gitInit

// chalk settings for colorized output
const blk = chalk.dim.black
const blu = chalk.blue
const mag = chalk.magenta
const yel = chalk.yellow
const red = chalk.red

// initialize a git repo
function gitInit (conf) {
  var initGit = [
    'git init --quiet',
    'git add --all',
    'git commit -m "initial commit"'
  ]

  process.stdout.write(blu('\nRepository:\n\n'))

  exec(initGit.join(' && '), function (err) {
    assert.ifError(err)

    process.stdout.write(blk('  repo: ') + yel('inited') + '\n')
    process.stdout.write(blk('  repo: ') + yel('templates added') + '\n')
    process.stdout.write(blk('  repo: ') + yel('initial commit') + '\n')

    if (!err && conf.meta.type === 'public' && !conf.meta.noRemote) {
      if (conf.meta.remoteCmd === 'hubCreate') githubCreate(conf)
      else gitaddRemote(conf)
    } else {
      msgDone()
    }
  })
}

function githubCreate (conf) {
  var hubCreate = [
    'hub create -d ' + '"' + conf.meta.description + '"'
  ]
  exec(hubCreate, function (err) {
    if (err) {
      process.stdout.write(blk('  repo: ') + red('hub not found. (https://github.com/github/hub)') + '\n')
      process.stdout.write(blk('  repo: ') + red('will attempt https option') + '\n')
      gitaddRemote(conf)
    }
    process.stdout.write(blk('  repo: ') + yel('remote created') + '\n')
    process.stdout.write(blk('  repo: ') + yel('description added') + '\n')

    if (!err && !conf.meta.noPush) {
      gitPush()
    } else {
      msgDone()
    }
  })
}

function gitaddRemote (conf) {
  var addRemote = [
    'git remote add origin https://github.com/' + conf.meta.name + '/' + conf.meta.packageName + '.git'
  ]
  exec(addRemote, function (err) {
    assert.ifError(err)
    process.stdout.write(blk('  repo: ') + yel('https remote added') + '\n')

    if (!err && !conf.meta.noPush) {
      process.stdout.write(blk('  repo: ') + red('username and password needed for https push') + '\n\n')
      tim(200)(function () {
        gitPush()
      })
    } else {
      msgDone()
    }
  })
}

function gitPush () {
  var pushGit = [
    'git push origin master'
  ]
  exec(pushGit, function (err) {
    assert.ifError(err)
    process.stdout.write(blk('  repo: ') + yel('pushed to github') + '\n')
    msgDone()
  })
}

function msgDone () {
  process.stdout.write(mag('\nAll done.\n'))
}
