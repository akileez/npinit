function expand (template, replacements, regex) {
  return resolve(template, replacements || template, regex)

  function resolve (template, data, regex) {
    switch (kindOf(template)) {
      case 'array' : return resolveArray(template, data, opts)
      case 'object': return resolveObject(template, data, regex)
      case 'string': return resolveString(template, data, regex)
      default      : return template
    }
  }

  function resolveObject (obj, data, regex) {
    var key
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key] = resolve(obj[key], data, regex)
      }
    }
    return obj
  }

  function resolveArray (arr, data, regex) {
    var len = arr.length
    var i = -1

    while (++i < len) {
      arr[i] = resolve(arr[i], data, regex)
    }
    return arr
  }

  function resolveString (str, data, regex) {
    var stache = regex || /\{\{([^\}]+)\}\}/g // mustache-like
    return str.replace(stache, replaceFn)

    function replaceFn (match, prop) {
      var template = look(data, prop)

      return stache.test(template)
        ? template.replace(stache, replaceFn)
        : template
    }
  }
}

function kindOf (value) {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'

  if (Array.isArray(value)) return 'array'

  if (typeof value === 'string') return 'string'
  if (typeof value === 'boolean') return 'boolean'
  if (typeof value === 'number') return 'number'
  if (typeof value === 'symbol') return 'symbol'
  if (typeof value === 'function') return 'function'

  if (value.constructor.name === 'Object') return 'object'
  if (value.constructor.name === 'RegExp') return 'regexp'
  if (value.constructor.name === 'Date') return 'date'

  return type.toLowerCase()
}

function look (obj, key) {
  if (!obj || !key) return

  var segs = key.split('.')

  while (segs.length) {
    obj = obj[segs.shift()]
    if (!obj) return
  }

  return obj
}

module.exports = expand
