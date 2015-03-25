# npinit
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]



## Installation
```bash
$ npm install akileez/npinit
```

## Usage
```
Usage: npinit <packageName> [options]

  Options:

    -h, --help          output usage information
    -v, --version       output the version number
    -p, --public        create a public module. a git repository will be
                        initialized. [default mode is private]
    -g, --git           initialize a git repository [default is none]
    --desc <string>     create a description for package.json. enclose the string in quotes
                        i.e., "This is an awesome project"
    --tags <string>     create keywords for package.json. use a comma separate list of items
                        i.e., "apple, orange, pear"

  Overrides:
  the default method is to read from package.json

    --license <string>  license type for project.
    --author <string>   author name for project.
    --email <string>    email for project.
    
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
