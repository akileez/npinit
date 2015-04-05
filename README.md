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
```

## Usage
```
  Usage: npinit <packageName> [options]
         npinit -n [options]
         npinit -d [options]

  Options:

    -h, --help          output usage information
    
    -v, --version       output the version number
    
    -n, --new           new private module. for use without a packageName. the default
                        packageName `testproj###` will be assigned. random number `###` 
                        generated to avoid potential conflicts. 
    
    -g, --github        new public module. a git repository will be 
                        automactically initialized and pushed to gihub. a packageName
                        is required. [default mode is private module, no git repo]
    
    -d, --dry           dry run displaying metadata used for generation
    
    -r, --repo          initialize a git repository when generating a private module
                        [default is none]
    
    --addRemote         process will use the generic git command: 
                        
                            `git remote add origin git@github.com:username/repo.git`
                        
                        username and repo will be automactically added. leaving this option
                        off will use `hub` (https://github.com/github/hub) to create the remote 
                        repository. [default command `hub create`]
    
    --noRemote          do not create a remote repository on github. noRemote assumes noPush and will
                        override addRemote if both are present. it will also override the default 
                        remote command `hub create` if addRemote is not present when creating a 
                        public module with flags -g or --github.
    
    --noPush            do not push repository to github. use only with flags -g or --github [default is push] 
    
    --desc <string>     description for package.json and github repository if using `hub`. enclose 
                        the string in quotes, i.e., "This is an awesome project"
    
    --tags <string>     keywords for package.json. use a comma separate list of items
                        i.e., "apple, orange, pear"

  Overrides:

    --author  <string>  author name for project. [default reads from .npmrc]
    --email   <string>  email for project. [default reads from .npmrc]
    --user    <string>  github username [default reads from .npmrc]
    --license <string>  license type for project. [default is MIT]
    --pkgv    <string>  semantic version for project [default 0.1.0]

    
    
```

## API
```js

```

## Why?


## See Also


## License
[MIT](https://tldrlegal.com/license/mit-license)

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
