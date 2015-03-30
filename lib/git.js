const exec = require('child_process').exec
const assert = require('assert')

module.exports = {
  Init: gitInit,
  Push: gitPush
}

// initialize a git repo
function gitInit (conf) {
  var initGit = [
    'git init --quiet',
    'git add --all',
    'git commit -m "initial commit"'
  ]
  exec(initGit.join(' && '), function (err) {
      assert.ifError(err)
      if (!err) {
        if ((conf.meta.type === 'public') && (conf.meta.push)) {
          gitPush(conf)
        }
      }
  })
}

function gitPush (conf) {
  var pushGit = [
    'hub create -d ' + '"' + conf.meta.description + '"',
    'git push origin master'
  ]
    exec(pushGit.join(' && ') ,function (err) {
      assert.ifError(err)
      if (!err) console.log('git inited and pushed to github')
    })
}
