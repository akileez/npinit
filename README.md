# npinit
[![NPM version][npm-image]][npm-url]
[![schoolmarm-standard-style][marm-image]][marm-url]
[![experimental][stability-image]][stability-url]
[![Downloads][downloads-image]][downloads-url]  

> Creates a new node project.

## Goal

To quickly initate a project, with complete structure, for testing, developing and/or publishing node modules with or without a public or private git repository. Whew, that was a mouthful!

## Why?

- reduce steps/boilerplate in module creation given sane preferences
- explore node further using process and assert
- a better understanding of callbacks.
- use a base argument processor and config it for application use (argh)

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
```js

```
## Examples

Preview [images](https://github.com/akileez/npinit/wiki/preview-images) available in the wiki.

```sh
# display help  
npinit
npinit help
npinit -h
npinit --help

# display version
npinit -v
npinit --version

# dry run. will display metadata of configured options (private/local module)  
npinit test -d
npinit test --dry 

# dry run. metadata of public or private module with git repo initialization. 
npinit test -dg
npinit test -dr 
npinit test -drg // this creates a private module with git repo. dry run though. 

# project named test with repo and pushed to github with 
# command `hub created -d [description]`
# license and travis.yml files are created with github option.
npinit test -g    

# project named test with repo and remote pushed to github using https
npinit test -g --remote 

# essentially the same command. see next example for differences.
npinit test -g --no-remote
npinit test -r

# project named test with repo and no remote created. 
# dependencies of async, lodash, coffeescript and mout installed. 
# same as npinit test -r --dep "async lodash coffeescript mout" but
# license and travis.yml files are created.
npinit test -g --no-remote --dep "async lodash coffeescript mout " 

# local module/repo, user added devDependencies
# test.js file created with installation of devDependencies
# stdout trace for npm install and git repo initialization with
# verbose option
npinit test -r --dev "tape istanbul " --verbose

# multi-line input. 
# make things easier by creating a shell script with inputs
# to reduce typing.
npinit test \
--desc "Hello World " \
--author=me \
--email "some@body.com " \
--pkgv "0.4.0" \
--user=zeke \
--license "BSD " \
--dev "tape istanbul " \
--dep "async lodash coffeescript mout " \
--github \
--verbose
```

## API

Not yet developed. Command-line app only. 


## See Also
[initialize](https://www.npmjs.com/package/initialize). Original inspiration of this project.  
[create-module](https://github.com/finnp/create-module). Another awesome project/module creation process which is extremely efficent.   
[ghrepo](https://github.com/mattdesl/ghrepo). Still another awesome project. Love the code organization and style.  
[ghwd](https://github.com/zeke/ghwd). For the command line junkies like me.  
[hub](https://github.com/github/hub). syntactic sugar for the git command.  
[argh](https://www.npmjs.com/package/argh). light weight option/argv parser for node, it only parses options, nothing more then that.  

## License
[ISC](https://github.com/akileez/npinit/blob/master/LICENSE)

[npm-image]: https://img.shields.io/npm/v/npinit.svg?style=flat-square
[npm-url]: https://npmjs.org/package/npinit
[marm-image]: https://img.shields.io/badge/code%20style-marm-brightgreen.svg?style=flat-square
[marm-url]: https://github.com/akileez/eslint-config-marm
[stability-image]: https://img.shields.io/badge/stability-experimental-darkorange.svg?style=flat-square
[stability-url]: https://github.com/akileez/npinit
[downloads-image]: http://img.shields.io/npm/dm/npinit.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/npinit
[license-img]: https://img.shields.io/badge/license-ISC-blue.svg?style=flat-square
[license-url]: https://github.com/akileez/npinit/blob/master/license.md
