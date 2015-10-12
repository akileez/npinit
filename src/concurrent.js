function asyncEachArray (arr, iterator, done) {
  if (!arr || !arr.length) return done()

  var idx = -1
  var len = arr.length
  var lastIdx = arr.length

  // lastIdx = len = arr.length

  while (++idx < lastIdx) {
    iterator(arr[idx], idx, next)
  }

  function next (err) {
    if (err) return once(done(err))
    if (--len === 0) return done(null)
  }
}

function asyncEach (obj, iterator, done) {
  if (Array.isArray(obj)) {
    asyncEachArray(obj, iterator, done)
    return
  }

  asyncEachArray(obj && keys(obj), function (key, index, done) {
    iterator(obj[key], key, done)
  }, done)
}

function asyncReduce (obj, result, iterator, done) {
  asyncEach(obj, function (v, k, done) {
    iterator(result, v, k, function (err, value) {
      result = value
      done(err)
    })
  }, function (err) {
    done(err, result)
  })
}

function asyncParallel (obj, done) {
  asyncReduce(obj, [], function (resultObject, v, k, done) {
    v(function (err, res) {
      resultObject.push(res)
      done(err, resultObject)
    })
  }, done)
}

function once (fn) {
  return function () {
    var ret = fn.apply(this, arguments)
    fn = noop
    return ret
  }
}

function keys (obj) {
  var result = []
  var key

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      result.push(key)
    }
  }
  return result
}

function noop () {}

exports.each     = asyncEach
exports.parallel = asyncParallel
