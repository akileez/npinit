// Copyright (c) hemanth <hemanth.hm@gmail.com> (h3manth.com)
// https://github.com/hemanth/timeout-thunk

'use strict'

module.exports = function (ms) {
  return function (func) {
    return setTimeout(func, ms)
  }
}
