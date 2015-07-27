// adopted from run-parallel

function parallel (tasks, callback, safe) {
  var len
  var results

  if (Array.isArray(tasks)) {
    results = []
    len = tasks.length

    tasks.forEach(function (task, i) {
      tasks[i](done.bind(null, i))
    })
  } else {
    var keys = Object.keys(tasks)
    results = {}
    len = keys.length

    keys.forEach(function (key) {
      tasks[key](done.bind(null, key))
    })
  }

  function done (i, err, res) {
    results[i] = res

    if (--len === 0 || err) {
      if (safe) {
        process.nextTick(function () {
          callback(err, results)
          process.nextTick(function () {
            callback = noop
          })
        })
      } else {
        callback(err, results)
        process.nextTick(function () {
          callback = noop
        })
      }
    }
  }

  function noop () {}
}

module.exports = parallel
