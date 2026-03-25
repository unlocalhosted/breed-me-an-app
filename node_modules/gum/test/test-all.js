/* vim:set ts=2 sw=2 sts=2 expandtab */
/*jshint asi: true undef: true es5: true node: true browser: true devel: true
         forin: true latedef: false globalstrict: true*/

"use strict";

var dsl = require("../gum")

function descriptor(source) {
  return Object.getOwnPropertyNames(source).reduce(function(result, name) {
    result[name] = Object.getOwnPropertyDescriptor(source, name)
    return result
  }, {})
}

function supplement() {
  var sources = Array.prototype.slice.call(arguments)
  return merge.apply(merge, sources.reverse())
}

function merge() {
  var sources = Array.prototype.slice.call(arguments)
  var whitelist = {}
  sources.forEach(function(source) {
    var properties = source ? descriptor(source) : {}
    Object.keys(properties).forEach(function(name) {
      whitelist[name] = properties[name]
    })
  })
  return Object.create(Object.getPrototypeOf(sources[0]), whitelist)
}

function pick() {
  var names = Array.prototype.slice.call(arguments)
  var source = names.shift()
  var properties = descriptor(source)
  var whitelist = {}
  names.forEach(function(name) {
    whitelist[name] = properties[name]
  })
  return Object.create(Object.getPrototypeOf(source), whitelist)
}

exports["test chaining"] = function(assert) {
  var hash = dsl({ merge: merge, pick: pick })

  var adjust = hash.
    merge({ x: 12, y: 13 }).
    pick('a', 'b', 'x')

  assert.deepEqual(adjust({ a: 1, b: 2, c: 3, d: 4 }),
                   { a: 1, b: 2, x: 12 },
                   "all chained methods were exected in order")
}

exports["test composition"] = function(assert) {
  var hash = dsl({ merge: merge, pick: pick, supplement: supplement })

  var setDefaults = hash.
    supplement({ x: 0, y: 0 })

  assert.deepEqual(setDefaults(), { x: 0, y: 0 }, "defaults were set")
  assert.deepEqual(setDefaults({ x: 3 }), { x: 3, y: 0 }, "defaults were set")

  var foo = setDefaults.
    merge({ foo: "foo" }).
    pick("x", "foo")

  assert.deepEqual(foo({}), { x: 0, foo: "foo" }, "composed further")
  assert.deepEqual(foo({ x: 1 }), { x: 1, foo: "foo" }, "values are taken")

  assert.deepEqual(setDefaults(), { x: 0, y: 0 }, "first chain is unaffected")
  assert.deepEqual(setDefaults({ x: 3 }), { x: 3, y: 0 }, "in case of args too")

  var bar = foo.
    merge({ bar: "bar" })

  assert.deepEqual(bar({ x: 1 }), { x: 1, foo: "foo", bar: "bar" },
                   "composed further")
}

exports["test bound data"] = function(assert) {
  var hash = dsl({ merge: merge, pick: pick, supplement: supplement })

  var value = hash({ a: 1, b: 2, c: 3, d: 4 }).
    merge({ x: 12, y: 13 }).
    pick('a', 'b', 'x')

  assert.deepEqual(value(), { x: 12, a: 1, b: 2 }, "value is curried")
  assert.deepEqual(value({ a: 2 }), { x: 12, a: 1, b: 2 }, "bound value is used")
}

require("test").run(exports)
