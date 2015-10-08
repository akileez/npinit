function expand (template, replacements, regex) {
  return resolve(template, replacements || template, regex)

  function resolve (template, data, regex) {
    switch (kindOf(template)) {
      case 'array' :
      case 'object': return resolveObject(template, data, regex)
      case 'string': return resolveString(template, data, regex)
      default      : return template
    }
  }

  function resolveObject (obj, data, regex) {
    Object.keys(obj).forEach(function (key, idx, arr) {
      obj[key] = resolve(obj[key], data, regex)
    })
    return obj
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
  return typeof value === 'object'
    ? Object.prototype.toString.call(value).replace(/^\[object |\]$/g, '').toLowerCase()
    : typeof value
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
