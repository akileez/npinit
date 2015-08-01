function asyncEachArray (arr, iterator, done) {
  if (!arr || !arr.length) return done()

  var idx = -1
  var len
  var lastIdx

  lastIdx = len = arr.length

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

  asyncEachArray(obj && Object.keys(obj), function (key, index, done) {
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
    v.call(null, function (err, res) {
      resultObject.push(res)
      done(null, resultObject)
    })
  }, done)
}

exports.each     = asyncEach
exports.parallel = asyncParallel