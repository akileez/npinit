module.exports = function () {
  console.log(function () {
  /*

  Usage: npinit <packageName> [options]
         npinit <packageName> --dry [options]
         npinit -n [options]
         npinit -dry [options]

  Options:

    -h, --help          output usage information

    -v, --version       output the version number

    --dry               dry run displaying metadata used for generation

    -n, --new           new private module. for use without a packageName. the default
                        packageName `testproj###` will be assigned. random number `###`
                        generated to avoid potential conflicts.

    -g, --github        new public module. a git repository will be
                        automactically initialized and pushed to gihub. a packageName
                        is required. [default mode is private module, no git repo]
                        running option -n or --new with -g or --github is equivalent to
                        option `-nr` or `--new --repo` initializing a new private
                        module with a git repository. packageName will not be required.
                        options --addRemote, --noRemote and --noPush are inactive in
                        this mode when `-ng` are run together.

    -r, --repo          initialize a git repository when generating a private module
                        [default is none]

    --addRemote         process will use the generic git command:

                          `git remote add origin https://github.com/username/repo.git`

                        username and repo will be automactically added. Leaving this
                        option off will use `hub` (https://github.com/github/hub)
                        to createthe remote repository. [default command `hub create`].
                        You will have to enter your github username and password
                        if NOT using the --noPush option.

    -R, --noRemote      do not create a remote repository on github. noRemote
                        assumes noPush and will override addRemote if both are present.
                        it will also override the default remote command `hub create`
                        if addRemote is not present when creating a public module
                        with flags -g or --github.

    -P, --noPush        do not push repository to github. use only with
                        flags -g or --github [default is push]

    --D <string>        a list of node modules to install, i.e.,
                        `--D "lodash moment"` or `--D "lodash, moment"`.
                        [npm i --save packages]

    --d <string>        a list of node dev modules to install, i.e.,
                        `--d "tape istanbul"` or `--d "tape, istanbul"`.
                        [npm i --save-dev devpackages]

  Overrides:

    --desc    <string>  description for package.json and github repository if using `hub`.
    --author  <string>  author name for project. [default reads from .npmrc or 'Your Name']
    --email   <string>  email for project. [default reads from .npmrc or 'your@email.com']
    --user    <string>  github username [default reads from .npmrc or 'githubName']
    --license <string>  license type for project. [default reads from .npmrc => ISC]
    --pkgv    <string>  semantic version for project [default reads from .npmrc => 1.0.0]

  */
  }.toString().split(/\n/).slice(2, -2).join('\n'))
  process.exit(0)
}
