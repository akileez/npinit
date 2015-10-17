var mkdirp = require('mkdirp')
var path   = require('path')
var fs     = require('fs')
var assert = require('assert')

function writeFile (file, data, enc, cb) {
  var dir
  if ((arguments.length === 3 && typeof enc !== 'function') || arguments.length === 2) {
    enc = enc || 'utf8'
    dir = path.dirname(file)
    if (exists(dir)) return fs.writeFileSync.apply(fs, arguments)

    mkdirp.sync(dir)
    return fs.writeFileSync.apply(fs, arguments)
  }

  if (typeof enc === 'function') {
    cb = enc
    enc = 'utf8'
  }

  dir = path.dirname(file)
  exists(dir, function (res) {
    if (res) return fs.writeFile(file, data, enc, cb)

    mkdirp(dir, function (err) {
      if (err) return cb(err)
      fs.writeFile(file, data, enc, cb)
    })
  })
}

function readFile (fp, opts, cb) {
  if (arguments.length === 1) return fs.readFileSync(fp, 'utf8')

  if (arguments.length === 2 && typeof opts === 'function') {
    cb = opts
    opts = 'utf8'
  } else {
    return fs.readFileSync(fp, opts)
  }

  fs.readFile(fp, opts, function (err, data) {
    assert.ifError(err)
    cb(null, data)
  })
}

function exists (fp, cb) {
  if (arguments.length === 1) {
    try {
      fs.accessSync(fp)
      return true
    } catch (err) {
      return false
    }
  }

  fs.access(fp, fs.F_OK, function (err) {
    cb(!(err))
  })
}

function sliced (args, slice, sliceEnd) {
  var res = []
  var len = args.length

  if (len === 0) return res

  var strt = slice < 0
    ? Math.max(0, slice + len)
    : slice || 0

  if (sliceEnd !== undefined) {
    len = sliceEnd < 0
      ? sliceEnd + len
      : sliceEnd
  }

  while (len-- > strt) {
    res[len - strt] = args[len]
  }
  return res
}

function isOr (value) {
  var args = sliced(arguments, 1, arguments.length)
  return args.some(function (val) {
    return (value === val)
  })
}

function keys (obj) {
  var result = []
  var key

  for (key in obj) {
    if (obj.hasOwnProperty(key)) result.push(key)
  }
  return result
}

function forEach (arr, fn) {
  var i = -1
  var len = arr.length

  while (++i < len) if (fn(arr[i], i, arr) === false) break
}

exports.writeFile = writeFile
exports.readFile = readFile
exports.exists = exists
exports.sliced = sliced
exports.isOr = isOr
exports.keys = keys
exports.forEach = forEach
