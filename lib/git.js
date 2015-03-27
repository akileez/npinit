const exec = require('child_process').exec
const assert = require('assert')

module.exports = {
  Init: gitInit,
  Push: gitPush
}

// initialize a git repo
function gitInit () {
  var initGit = [
    'git init --quiet',
    'git add --all',
    'git commit -m "initial commit"'
  ]
  exec(initGit.join(' && '), function (err) {
    assert.ifError(err)
  })
}

function gitPush (conf) {
  var pushGit = [
    'git remote add origin git@github.com:' + conf.name + '/' + conf.packageName + '.git',
    'git push -u origin master'
  ]
  exec(pushGit.join(' && '), function (err) {
    assert.ifError(err)
  })
}