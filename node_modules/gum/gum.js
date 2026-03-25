/* vim:set ts=2 sw=2 sts=2 expandtab */
/*jshint asi: true undef: true es5: true node: true browser: true devel: true
         forin: false latedef: false globalstrict: true*/
"use strict";

// Shortcut for `Object.getOwnPropertyNames` or shimmed fallback.
var names = Object.getOwnPropertyNames || (function() {
  var owner = Object.prototype.hasOwnProperty
  return function names(object) {
    var result = []
    for (var name in object)
      if (owner.call(object, name)) result.push(name)
    return result
  }
})()

// Shortcut for `Object.defineProperties` or shimmed fallback.
var define = Object.defineProperties || function(object, properties) {
  for (var name in properties) object[name] = properties[name].value
  return object
}

var makeMethod = (function() {
  // Shortcut for `Array.prototype.slice` for efficient arguments slicing.
  var slicer = Array.prototype.slice

  // Utility function that takes `f` function and dsl methods and returns
  // method which when invoked curries arguments and keeps reference to the
  // owner function.
  return function makeMethod(f, dsl) {
    return function method() {
      var source = this
      var params = slicer.call(arguments)
      params.unshift(void(0))
      return define(function composite(input) {
        params[0] = source.call(source, input)
        return f.apply(f, params)
      }, dsl)
    }
  }
})()

function gum(hash) {
  var dsl = names(hash).reduce(function(dsl, name) {
    dsl[name] = { value: makeMethod(hash[name], dsl) }
    return dsl
  }, {})

  return define(function chain(value) {
    return this === chain ? value : define(function() { return value }, dsl)
  }, dsl)
}

module.exports = gum
