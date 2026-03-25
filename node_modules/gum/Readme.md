# gum

[![Build Status](https://secure.travis-ci.org/Gozala/gum.png)](http://travis-ci.org/Gozala/gum)

Small method chaining library, that can be used to create jQuery like DSLs
from arbitrary functions.


## Usage

Lets define few utility functions that operate on hashes that we'll create
DSL for (feel free to skip to a next session)

```js

// General funciton definitions (You can skip this part)

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
```

Hash of functions can be used to assemble DSL providing method chaining
interface.

```js
var gum = require("gum")
var hash = gum({ merge: merge, pick: pick, supplement: supplement })
```

Chained operations result in a simple functions that execute chained
tasks when invoked:

```js
var setDefaults = hash.
    supplement({ x: 0, y: 0 })

setDefaults()           // => { x: 0, y: 0 }
setDefaults({ x: 1 })   // => { x: 1, y: 0 }
```


Each composed function has is aware of the DSL it's part of, so new
compostions can be created by further chaining:

```js
var adjust = setDefualts.
  merge({ x: 11, z: 17 }).
  pick("y", "z")

adjust()              // => { y: 0, z: 17 }
adjust({ y: 15 })     // => { y: 15, z: 17 }
```

Composed chains could also be bound to the input known up front:


```js
var value = hash({ a: 1, b: 2, c: 3, d: 4 }).
  merge({ x: 12, y: 13 }).
  pick('a', 'b', 'x')

value()             // => { x: 12, a: 1, b: 2 }
```

## Install

    npm install gum
