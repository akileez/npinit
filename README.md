# npinit
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]
[![experimental][stability-image]][stability-url]

---

Creates a new node project.
!! Breaking change. Options re-configured. 

## Goal

To quickly initate a project, with complete structure, for testing, developing and/or publishing 
node modules with or without a public or private git repository. Whew, that was a mouthful!

## Why?

- to reduce steps/boilerplate in module creation given my preferences
- to explore node further (process, assert)
- to get better understanding of callbacks.
- to use a base argument processor and config it for application use (argh)


## Installation
```bash
$ npm install -g npinit
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

```

## Examples

```sh
npinit --dry # same as npinit -n --dry
# dry run. will display metadata of configured options (private/local module)  

npinit -g --dry
# dry run. metadata of public module with git repo initialize  

npinit -ng --dry
# dry run private/local module with git repo initalized  

npinit -g --noPush
# display help because -g/--github wants a package/project name  

npinit test -g  
# project named test with repo and pushed to github with command `hub created -d [description]`  

npinit test -g --addRemote --noPush
# project named test with repo and remote created to github with https but not pushing to github   

npinit test -g --noRemote --D "async lodash coffeescript mout " 
# project named test with repo and no remote created. dependencies of async, lodash, coffeescript and mout installed. same as npinit test -r --D "async lodash coffeescript mout"

npinit test -g --desc "Hello World" --author=me --email "some@body.com" --pkgv "0.4.0" --user=zeke --license "BSD"
# project named test with repo pushed to github with hub create and user overrides  

npinit hellotest -r --d "tape istanbul"
# local module/repo, user added devDependencies  
```

## See Also
[initialize](https://www.npmjs.com/package/initialize). Inspiration of this project. This is my fork, albeit a bloated fork.  
[create-module](https://github.com/finnp/create-module). Another awesome project/module creation process which is extremely efficent.   
[ghrepo](https://github.com/mattdesl/ghrepo). Still another awesome project. Love the code organization and style.  
[ghwd](https://github.com/zeke/ghwd). For the command line junkies like me.  
[hub](https://github.com/github/hub). syntactic sugar for the git command.  
[argh](https://www.npmjs.com/package/argh). light weight option/argv parser for node, it only parses options, nothing more then that.  

## License [![ISC license][license-img]][license-url]
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
[license-img]: https://img.shields.io/badge/license-ISC-blue.svg?style=flat-square
[license-url]: https://github.com/akileez/npinit/blob/master/license.md
