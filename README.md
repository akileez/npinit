# npinit
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]
[![experimental][stability-image]][stability-url]



## Installation
```bash
$ npm install -g akileez/npinit
```

Update your npm config:

``` bash
npm config set init.author.name "Your Name"
npm config set init.author.url "http://example.com"
npm config set init.author.email "me@example.com"
npm config set init.author.github "your-github-handle"
npm config set init.license "MIT"
npm config set init.version 0.1.0
```

## Usage
```
  Usage: npinit <packageName> [options]
         npinit -n [options]
         npinit -d [options]

  Options:

    -h, --help          output usage information

    -v, --version       output the version number

    -d, --dry           dry run displaying metadata used for generation

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

                        username and repo will be automactically added. You will have
                        to enter your github username and password. Leaving this option
                        off will use `hub` (https://github.com/github/hub) to create
                        the remote repository. [default command `hub create`]

    -R, --noRemote      do not create a remote repository on github. noRemote
                        assumes noPush and will override addRemote if both are present.
                        it will also override the default remote command `hub create`
                        if addRemote is not present when creating a public module
                        with flags -g or --github.

    -P, --noPush        do not push repository to github. use only with
                        flags -g or --github [default is push]

    -D, --noDeps        do not install default dependencies.
                        [defaults: `npm i mocha standard --save-dev`]

    --mods <string>     a list of node modules to install, i.e.,
                        `--modules "lodash moment"` or `--modules "lodash, moment"`.
                        this option is independent from no-dependencies option
                        -D or --noDeps.

  Overrides:

    --desc    <string>  description for package.json and github repository if using `hub`.
    --author  <string>  author name for project. [default reads from .npmrc or 'Your Name']
    --email   <string>  email for project. [default reads from .npmrc or 'your@email.com']
    --user    <string>  github username [default reads from .npmrc or 'githubName']
    --license <string>  license type for project. [default reads from .npmrc => ISC]
    --pkgv    <string>  semantic version for project [default reads from .npmrc => 1.0.0]

```

## Why?
- to explore node further (process, assert)
- to get handle on callbacks (waterfall method)
- to reduce steps/boilerplate in module creation given my preferences
- to use a base argument processor and config it for application use (argh)

## See Also
[initialize](https://www.npmjs.com/package/initialize). Inspiration of this project. Essentially a fork. I say 
essentially because I am only using the project structure. Practically all internals have been (or yet to be) refactored.

[argh](https://www.npmjs.com/package/argh). light weight option/argv parser for node, it only parses options, nothing more then that.
## License
[ISC](https://tldrlegal.com/license/-isc-license)

[npm-image]: https://img.shields.io/npm/v/npinit.svg?style=flat-square
[npm-url]: https://npmjs.org/package/npinit
[travis-image]: https://img.shields.io/travis/akileez/npinit.svg?style=flat-square
[travis-url]: https://travis-ci.org/akileez/npinit
[coveralls-image]: https://img.shields.io/coveralls/akileez/npinit.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/akileez/npinit?branch=master
[downloads-image]: http://img.shields.io/npm/dm/npinit.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/npinit
[stability-image]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[stability-url]: https://github.com/akileez/npinit
