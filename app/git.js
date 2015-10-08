const exists  = require('../src/utils').exists
const iterate = require('../src/iterate')
const display = require('./display')
const exec    = require('child_process').exec
const assert  = require('assert')

function init (conf, next) {
  if (conf.git) {
    display.heading('Repository')

    var errFlag = false
    var isPublic = (conf.meta.type === 'public' && conf.meta.remote !== false)
    var isFakeUser = conf.meta.name === 'githubName'

    var gitOps = [
      gitInit,
      githubCreate,
      gitaddRemote,
      gitPush
    ]

    iterate.series(gitOps, function (err) {
      assert.ifError(err)
      next(null)
    })
  } else {
    return next(null)
  }

  // initialize a git repo
  function gitInit (cb) {
    var initGit
    var addGit = [
      'git add --all',
      'git commit -m "initial commit"'
    ]

    if (conf.verbose) initGit = ['git init']
    else initGit = ['git init --quiet']

    exec(initGit.concat(addGit).join(' && '), function (err, stdout, stderr) {
      var gitExists = exists('./.git')

      if (conf.verbose) {
        if (stderr) {
          display.stderr(stderr, 'git error!')
          if (isPublic) process.exit(1)
        }
        if (stdout) display.stdout('git init, add and commit', stdout)
      } else if (gitExists) {
        display.event('repo:', 'inited', 'yellow')
        display.event('repo:', 'templates added', 'yellow')
        display.event('repo:', 'initial commit', 'yellow')
      } else {
        assert.ifError(err)
      }

      cb(null)
    })
  }

  function githubCreate (cb) {
    if (isFakeUser) {
      display.stderr('github username is not correct', 'hubCreate')
      display.error('process exiting')
    }

    if (isPublic && conf.meta.remote === 'hubCreate') {
      var hubCreate = ['hub create -d ' + '"' + conf.meta.description + '"']

      exec(hubCreate, function (err) {
        if (err) {
          display.event('repo:', 'hub not found. (https://github.com/github/hub)', 'red')
          display.event('repo:', 'will attempt https option', 'red')
          errFlag = true
          return cb(null)
        }
        display.event('repo:', 'remote created', 'yellow')
        display.event('repo:', 'description added', 'yellow')

        cb(null)
      })
    } else {
      cb(null)
    }
  }

  function gitaddRemote (cb) {
    if (isFakeUser) {
      display.stderr('github username is not correct', 'addRemote')
      display.error('process exiting')
    }

    if (isPublic) {
      if (conf.meta.remote === 'addRemote' || errFlag === true) {
        var addRemote = [
          'git remote add origin https://github.com/' + conf.meta.name + '/' + conf.meta.packageName + '.git'
        ]
        exec(addRemote, function (err) {
          assert.ifError(err)
          display.event('repo:', 'https remote added', 'yellow')

          if (conf.meta.push) {
            display.event('repo:', 'username and password needed for https push', 'red')
            return cb(null)
          }

          cb(null)
        })
      } else {
        cb(null)
      }
    } else {
      cb(null)
    }
  }

  function gitPush (cb) {
    if (isPublic && conf.meta.push) {
      var pushGit = [
        'git push origin master'
      ]

      exec(pushGit, function (err) {
        assert.ifError(err)
        display.event('repo:', 'pushed to github', 'yellow')
        cb(null)
      })
    } else {
      cb(null)
    }
  }
}

module.exports = init
