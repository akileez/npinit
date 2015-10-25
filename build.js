// build script to generate the usage display given the
// prescribed (and preferred) method used within this module.

var assert = require('assert')
var cliusage = require('toolz/src/text/cli-usage')
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

var opts = {
  title: 'npinit',
  description: 'node project init - basic unix style module creation.',
  synopsis: [
    '   npinit <packageName> [options]',
    '   npinit <packageName> --dry [options]',
    '   npinit -d [options]'
  ],
  groups: {
    main: 'Options',
    misc: 'Overrides'
  },
  viewWidth: 85
}

var defs = [
  { name: 'help', alias: 'h', type: Boolean, group: 'main',
    description: 'display usage information'
  },
  { name: 'version', alias: 'v', type: Boolean, group: 'main',
    description: 'display program version number'
  },
  { name: 'dry', alias: 'd', type: Boolean, group: 'main',
    description: 'dry run displaying metadata used for generation\n\n'
  },
  { name: 'repo', alias: 'r', type: Boolean, group: 'main',
    description: 'initialize a git repository when generating a private module. [default is none]\n\n'
  },
  { name: 'github', alias: 'g', type: Boolean, group: 'main',
    description: 'new public module. a git repository will be automactically initialized and pushed to gihub.\n\n'
  },
  { name: 'remote', type: Boolean, group: 'main',
    description: 'process will use the generic git command: \n\n`git remote add origin https://github.com/username/repo.git`\n\n username and repo will be automactically added. Leaving this name off will use `hub` (https://github.com/github/hub) to createthe remote repository. You will have to enter your github username and password.\n\n'
  },
  { name: 'no-remote', type: Boolean, group: 'main',
    description: 'do not create a remote repository on github.\n\n'
  },
  { name: 'dep', type: String, multiple: true, group: 'main',
    description: 'Dependencies. Give a list of node modules to install, i.e., `--dep "lodash moment"` or `--dep "lodash, moment"`. Command executed is [npm install --save packages]\n\n'
  },
  { name: 'dev', type: String, multiple: true, group: 'main',
    description: 'devDependencies. Give a list of node dev modules to install, i.e., `--dev "tape, istanbul"` or `--dev "tape, istanbul"`. Command executed is [npm install --save-dev devpackages]\n\n'
  },
  { name: 'verbose', type: Boolean, group: 'main',
    description: 'sliem sddlkj elkjt dher dfjsue sjkhe skjheir glfos sdlfj.\n\n'
  },
  { name: 'desc', type: String, group: 'misc',
    description: 'project description'
  },
  { name: 'authr', type: String, group: 'misc',
    description: 'author name [default reads from .npmrc or \'Your Name\']'
  },
  { name: 'email', type: String, group: 'misc',
    description: 'email [default reads from .npmrc or \'your@email.com\']'
  },
  { name: 'user', type: String, group: 'misc',
    description: 'github username [default reads from .npmrc or \'githubName\']'
  },
  { name: 'lic', type: String, group: 'misc',
    description: 'license type for project. [default reads from .npmrc => ISC]'
  },
  { name: 'pkgv', type: String, group: 'misc',
    description: 'semantic version [default reads from .npmrc => 1.0.0]'
  }
]

var obj = {
  body : cliusage(defs, opts)
}

writeFile(dest, expand(usage.toString(), obj), function (err) {
  assert.ifError(err)
  appendFile(dest, makeModule, function (err) {
    assert.ifError(err)
    console.log('\n  File:', clrz.magenta(dest), 'generated and ready for use.')
    console.log(clrz.green('  Done!'))
  })
})
