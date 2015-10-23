function usage() {
  console.log(function () {
  /*

  [31mnpinit[39m
  node project init - basic unix style module creation.

  [4mUsage[24m

    npinit <packageName> [options]
    npinit <packageName> --dry [options]

  -h, --help            display usage information
  -v, --version         display program version number
  -d, --dry             dry run displaying metadata used for generation
  -r, --repo            initialize a git repository when generating a private module.
                        [default is none]
  -g, --github          new public module. a git repository will be automactically
                        initialized and pushed to gihub.
  --remote              process will use the generic git command: `git remote add origin
                        https://github.com/username/repo.git`
  --no-remote           do not create a remote repository on github.
  --dep <string>        Dependencies. Give a list of node modules to install, i.e.,
                        `--dep "lodash moment"` or `--dep "lodash, moment"`. Command
                        executed is [npm install --save packages]
  --dev <string>        devDependencies. Give a list of node dev modules to install,
                        i.e., `--dev "tape, istanbul"` or `--dev "tape, istanbul"`.
                        Command executed is [npm install --save-dev devpackages]
  --verbose             sliem sddlkj elkjt dher dfjsue sjkhe skjheir glfos sdlfj.

  [4mOverrides:[24m

  --desc <string>       description for package.json and github repository if using
                        `hub`.
  --author <string>     author name for project. [default reads from .npmrc or 'Your
                        Name']
  --email <string>      email for project. [default reads from .npmrc or
                        'your@email.com']
  --user <string>       github username [default reads from .npmrc or 'githubName']
  --license <string>    license type for project. [default reads from .npmrc => ISC]
  --pkgv <string>       semantic version for project [default reads from .npmrc =>
                        1.0.0]

  */
  }.toString().split(/\n/).slice(2, -2).join('\n'))
  process.exit(0)
}

module.exports = usage