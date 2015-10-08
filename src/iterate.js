function asyncEachArray (arr, iterator, done) {
  if (!arr || !arr.length) return done()

  var lastIdx = arr.length
  var iterate = function (idx) {
    if (idx === lastIdx) return done()

    iterator(arr[idx], idx, function (err) {
      if (err) return done(err)

      iterate(++idx)
    })
  }
  iterate(0)
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

function asyncSeries (obj, done) {
  asyncReduce(obj, [], function (resultObject, v, k, done) {
    v(function (err, res) {
      resultObject.push(res)
      done(err, resultObject)
    })
  }, done)
}

exports.each      = asyncEach
exports.series    = asyncSeries
