const exec = require('child_process').exec
const assert = require('assert')
const display = require('../lib/display')

module.exports = gitInit

// initialize a git repo
function gitInit (conf, cb) {
  var initGit = [
    'git init --quiet',
    'git add --all',
    'git commit -m "initial commit"'
  ]

  display.heading('Repository')

  exec(initGit.join(' && '), function (err) {
    assert.ifError(err)
    display.event('repo:', 'inited', 'yel')
    display.event('repo:', 'templates added', 'yel')
    display.event('repo:', 'initial commit', 'yel')

    if (conf.meta.type === 'public' && !conf.meta.noRemote) {
      if (conf.meta.remoteCmd === 'hubCreate') githubCreate(conf)
      else gitaddRemote(conf)
    } else {
      cb(null)
    }
  })
}

function githubCreate (conf) {
  var hubCreate = [
    'hub create -d ' + '"' + conf.meta.description + '"'
  ]
  exec(hubCreate, function (err) {
    if (err) {
      display.event('repo:', 'hub not found. (https://github.com/github/hub)', 'red')
      display.event('repo:', 'will attempt https option', 'red')
      gitaddRemote(conf)
    }
    display.event('repo:', 'remote created', 'yel')
    display.event('repo:', 'description added', 'yel')

    if (!conf.meta.noPush) {
      gitPush()
    } else {
      display.done()
    }
  })
}

function gitaddRemote (conf) {
  var addRemote = [
    'git remote add origin https://github.com/' + conf.meta.name + '/' + conf.meta.packageName + '.git'
  ]
  exec(addRemote, function (err) {
    assert.ifError(err)
    display.event('repo:', 'https remote added', 'yel')

    if (!conf.meta.noPush) {
      display.event('repo:', 'username and password needed for https push', 'red')
      tim(200)(function () {
        gitPush()
      })
    } else {
      display.done()
    }
  })
}

function gitPush () {
  var pushGit = [
    'git push origin master'
  ]
  exec(pushGit, function (err) {
    assert.ifError(err)
    display.event('repo:', 'pushed to github', 'yel')
    display.done()
  })
}
