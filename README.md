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
    -d, --dry           dry run displaying metadata used for generation
    -g, --github        create public module. a git repository will be
                        automactically initialized and pushed to gihub.
                        [default mode is private/local module, no git repo]
    -r, --repo          initialize a git repository [default is none]
    --noPush            do not push repository to github. use with flags -g or --github
    --desc <string>     description for package.json. enclose the string in quotes
                        i.e., "This is an awesome project"
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
