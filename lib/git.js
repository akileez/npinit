const exec = require('child_process').exec
const assert = require('assert')

module.exports = gitInit

// initialize a git repo
function gitInit (conf) {
  var initGit = [
    'git init --quiet',
    'git add --all',
    'git commit -m "initial commit"'
  ]
  exec(initGit.join(' && '), function (err) {
      assert.ifError(err)
      if (!err && conf.meta.type === 'public' && !conf.meta.noRemote) {
        if (conf.meta.remoteCmd === 'hubCreate') githubCreate(conf)
        else gitaddRemote(conf)
      }
  })
}

function githubCreate (conf) {
  var hubCreate = [
    'hub create -d ' + '"' + conf.meta.description + '"'
  ]
  exec(hubCreate, function (err) {
    assert.ifError(err)
    if (!err && !conf.meta.noPush) {
      gitPush()
    }
  })
}

function gitaddRemote (conf) {
  if (ghttps) {
    var addRemote = [
      'git remote add origin https://github.com/' + conf.meta.name + '/' + conf.meta.packageName + '.git'
    ]
  } else if (ghAuth) {
    var addRemote = [
      'code for ghAuthorization'
      // Possibly make this a separate process using npinit --ghAuth
    ]
  } else {
    var addRemote = [
      'git remote add origin git@github.com:' + conf.meta.name + '/' + conf.meta.packageName + '.git'
    ]
  }

  exec(addRemote, function (err) {
    if (err) {
      process.stdout.write('Please use options --addRemote --ghAuth for token authorization')
      assert.ifError(err)
    }
    if (!err && !conf.meta.noPush) {
      gitPush()
    }
  })
}

function gitPush () {
  var pushGit = [
    'git push origin master'
  ]
    exec(pushGit, function (err) {
      assert.ifError(err)
    })
}
