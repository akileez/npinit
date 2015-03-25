const exec = require('child_process').exec
const assert = require('assert')

module.exports = installDeps

function installDeps () {
  console.log('');
  console.log('dependencies');

    exec('npm link moment', function(err) {
    console.log('  module: ', 'moment');
    assert.ifError(err);
  });

  exec('npm link mout', function(err) {
    console.log('  module: ', 'mout');
    assert.ifError(err);
  });

  exec('npm link assemble', function(err) {
    console.log('  module: ', 'assemble');
    assert.ifError(err);
  });

  exec('npm link gulp', function(err) {
    console.log('  module: ', 'gulp');
    assert.ifError(err);
  });

  exec('npm link mocha', function(err) {
    console.log('  module: ', 'mocha');
    assert.ifError(err);
  });
}