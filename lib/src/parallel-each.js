function each (array, iterator, callback) {
  var i = -1
  var len = array.length
  var results = []

  function done (i, err, res) {

    results[i] = res

    if (err) {
      callback(err, results)
      callback = noop
      return
    }

    if (i === len -1)
      return callback(err, results)

  }

  function noop () {}

  while (++i < len) {
    iterator(array[i], i, done.bind(null, i))
  }
}

module.exports = each
