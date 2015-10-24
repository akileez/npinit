// build script to generate the usage display given the
// prescribed (and preferred) method used within this module.

var assert = require('assert')
var columns = require('toolz/src/text/columns')
var expand = require('toolz/src/string/expand')
var writeFile = require('toolz/src/file/writeFile')
var appendFile = require('toolz/src/file/append')
var clrz = require('colorz')

console.log(clrz.underline(clrz.cyan('\nBuild Script:')))

var dest = './bin/usage.js'

function usage () {
  console.log(function () {
  /*
  {{body}}
  */
  }.toString().split(/\n/).slice(2, -2).join('\n'))
  process.exit(0)
}

var makeModule = '\n\nmodule.exports = usage\n'

var data = {
  options: {
    columns: [
      {name: 'option', nowrap: true},
      {name: 'description'}
    ]
  },

  data: [
    '',
    '\u001b[31mnpinit\u001b[39m',
    'node project init - basic unix style module creation.',
    '',
    clrz.underline('Usage'),
    '',
    '  npinit <packageName> [options]',
    '  npinit <packageName> --dry [options]',
    '',
    { option: '-h, --help', description: 'display usage information' },
    { option: '-v, --version', description: 'display program version number' },
    { option: '-d, --dry', description: 'dry run displaying metadata used for generation\n\n' },
    { option: '-r, --repo', description: 'initialize a git repository when generating a private module. [default is none]\n\n' },
    { option: '-g, --github', description: 'new public module. a git repository will be automactically initialized and pushed to gihub.\n\n' },
    { option: '--remote', description: 'process will use the generic git command: \n\n`git remote add origin https://github.com/username/repo.git`\n\n username and repo will be automactically added. Leaving this option off will use `hub` (https://github.com/github/hub) to createthe remote repository. You will have to enter your github username and password.\n\n'},
    { option: '--no-remote', description: 'do not create a remote repository on github.\n\n'},
    { option: '--dep <string>', description: 'Dependencies. Give a list of node modules to install, i.e., `--dep "lodash moment"` or `--dep "lodash, moment"`. Command executed is [npm install --save packages]\n\n'},
    { option: '--dev <string>', description: 'devDependencies. Give a list of node dev modules to install, i.e., `--dev "tape, istanbul"` or `--dev "tape, istanbul"`. Command executed is [npm install --save-dev devpackages]\n\n'},
    { option: '--verbose', description: 'sliem sddlkj elkjt dher dfjsue sjkhe skjheir glfos sdlfj.\n\n' },
    clrz.underline('Overrides:'),
    '',
    { option: '--desc  <string>', description: 'description for package.json and github repository if using `hub`.'},
    { option: '--author <string>', description: 'author name for project. [default reads from .npmrc or \'Your Name\']'},
    { option: '--email <string>', description: 'email for project. [default reads from .npmrc or \'your@email.com\']'},
    { option: '--user <string>', description: 'github username [default reads from .npmrc or \'githubName\']'},
    { option: '--license <string>', description: 'license type for project. [default reads from .npmrc => ISC]'},
    { option: '--pkgv <string>', description: 'semantic version for project [default reads from .npmrc => 1.0.0]'}
  ]
}

var obj = {
  body : columns(data, {viewWidth: 85, padding: {left: '  ', right: '  '}})
}

writeFile(dest, expand(usage.toString(), obj), function (err) {
  assert.ifError(err)
  appendFile(dest, makeModule, function (err) {
    assert.ifError(err)
    console.log('\n  File:', clrz.magenta(dest), 'generated and ready for use.')
    console.log(clrz.green('  Done!'))
  })
})
