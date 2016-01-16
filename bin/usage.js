function usage() {
  console.log(function () {
  /*

  [1m[36mnpinit[39m[22m
  node project init - basic unix style module creation.

  [1m[4mSynopsis[24m[22m

     npinit <packageName> [options]
     npinit <packageName> --dry [options]
     npinit -d [options]

  [1m[4mOptions[24m[22m

  [35m[1m-h[22m[39m, [35m[1m--help[22m[39m [30m[2m[22m[39m           display usage information
  [35m[1m-v[22m[39m, [35m[1m--version[22m[39m [30m[2m[22m[39m        display program version number
  [35m[1m-d[22m[39m, [35m[1m--dry[22m[39m [30m[2m[22m[39m            dry run displaying metadata used for generation

  [35m[1m-r[22m[39m, [35m[1m--repo[22m[39m [30m[2m[22m[39m           initialize a git repository when generating a private
                        module. [default is none]

  [35m[1m-g[22m[39m, [35m[1m--github[22m[39m [30m[2m[22m[39m         new public module. a git repository will be automactically
                        initialized and pushed to gihub.

  [35m[1m--remote[22m[39m [30m[2m[22m[39m             process will use the generic git command:

                        `git remote add origin https://github.com/username/repo.git`

                        username and repo will be automactically added. Leaving this
                        name off will use `hub` (https://github.com/github/hub) to
                        createthe remote repository. You will have to enter your
                        github username and password.

  [35m[1m--no-remote[22m[39m [30m[2m[22m[39m          do not create a remote repository on github.

  [35m[1m--dep[22m[39m [30m[2m<string, ...>[22m[39m   Dependencies. Give a list of node modules to install, i.e.,
                        `--dep "lodash moment"` or `--dep "lodash, moment"`. Command
                        executed is [npm install --save packages]

  [35m[1m--dev[22m[39m [30m[2m<string, ...>[22m[39m   devDependencies. Give a list of node dev modules to install,
                        i.e., `--dev "tape, istanbul"` or `--dev "tape, istanbul"`.
                        Command executed is [npm install --save-dev devpackages]

  [35m[1m--verbose[22m[39m [30m[2m[22m[39m            sliem sddlkj elkjt dher dfjsue sjkhe skjheir glfos sdlfj.


  [1m[4mOverrides[24m[22m

  [35m[1m--desc[22m[39m [30m[2m<string>[22m[39m       project description
  [35m[1m--authr[22m[39m [30m[2m<string>[22m[39m      author name [default reads from .npmrc or 'Your Name']
  [35m[1m--email[22m[39m [30m[2m<string>[22m[39m      email [default reads from .npmrc or 'your@email.com']
  [35m[1m--user[22m[39m [30m[2m<string>[22m[39m       github username [default reads from .npmrc or 'githubName']
  [35m[1m--lic[22m[39m [30m[2m<string>[22m[39m        license type for project. [default reads from .npmrc => ISC]
  [35m[1m--pkgv[22m[39m [30m[2m<string>[22m[39m       semantic version [default reads from .npmrc => 1.0.0]

  */
  }.toString().split(/\n/).slice(2, -2).join('\n'))
  process.exit(0)
}

module.exports = usage
