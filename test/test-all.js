'use strict'

const test = require('tape')

const I = require('..').I
const eol = I.eol
const flattenI = require('..').flattenI
const arrayI = require('..').arrayI
const mapI = require('..').mapI
const reduceI = require('..').reduceI
const whereI = require('..').whereI
const whereMatchI = require('..').whereMatchI
const repeatI = require('..').repeatI
const takeI = require('..').takeI
const partitionI = require('..').partitionI
const groupByI = require('..').groupByI
const sortByPriorityI = require('..').sortByPriorityI
const flattenObjI = require('..').flattenObjI
const interleaveI = require('..').interleaveI

const strip = require('..').simpleStrip
const get = require('..').get

const threadA = require('..').threadA

test('iterables', (t) => {
  t.ok(true, 'true is ok')
  t.ok(I([1, 2, 3]), 'iterator creation is sane')
  t.ok(eol(() => {
    const iter = I([1])
    return iter() && iter()
  }.call()), 'end of iteration yields eol')
  t.ok(eol(I()()), 'unbacked iterator yields infinite eol')
  t.ok(Array.isArray(arrayI(I([4, 5, 6]))), 'iterator -> array works')
  testI(t, mapI((val) => val + 1, [1, 2, 3]), [2, 3, 4], 'mapI')
  testI(t, flattenI([[1, 2, 3], 4, [5, 6, [7], [], 8]]),
      [1, 2, 3, 4, 5, 6, 7, 8],
      'flattenI')
  t.equals(reduceI((sum, val) => sum + val, 0, [1, 2, 3, 4, 5]), 15, 'reduceI')
  t.equals(whereI((val) => val === 'ok', [1, 2, 3, 'ok', 666]), 'ok', 'whereI')
  t.deepEquals(whereMatchI({status: 'yes!'}, [
    {status: 'meh'},
    {status: 'bah'},
    {status: 'yes!', data: 'ok'},
    {status: 'pfff'}
  ]), {status: 'yes!', data: 'ok'}, 'whereMatchI')
  testI(t, takeI(5, repeatI('ok')),
      ['ok', 'ok', 'ok', 'ok', 'ok'],
      'takeI and repeatI constant')
  testI(t, takeI(5, repeatI((i) => i + 1)),
      [1, 2, 3, 4, 5],
      'takeI and repeatI fn')
  testI(t, partitionI(2, takeI(4, repeatI('ok'))),
    [['ok', 'ok'], ['ok', 'ok']], 'partitionI nonoverlapping')
  testI(t, partitionI(2, 1, [1, 2, 3, 4]),
    [[1, 2], [2, 3], [3, 4], [4]], 'partitionI offset < n')
  testI(t, partitionI(2, 3, [1, 2, 3, 4, 5]),
    [[1, 2], [4, 5]], 'partitionI offset > n')
  t.deepEquals(groupByI(identity, [3, 1, 2, 2, 1, 4]),
      {1: [1, 1], 2: [2, 2], 3: [3], 4: [4]},
      'groupByI')
  testI(t, flattenObjI({ok: 'k', notBad: 'nope', hey: 'yo'}),
      [['ok', 'k'], ['notBad', 'nope'], ['hey', 'yo']],
      'flattenObjI')
  testI(t, sortByPriorityI((obj) => obj.id, [{id: 0}, {id: 2}, {id: 0}, {id: 1}]),
      [{id: 2}, {id: 1}, {id: 0}, {id: 0}],
      'sortByPriorityI')
  testI(t, interleaveI(1, 'ok', ['hey', 'hey', 'hey']),
      ['hey', 'ok', 'hey', 'ok', 'hey'],
      'interleaveI')
  t.end()
})

test('utils', (t) => {
  t.equals(
    strip('<div>It\'s <strong>cool</strong>, <span>doggy</span></div>', ['strong', 'span']),
        '<div>It\'s cool, doggy</div>',
        'simpleStrip')
  t.equals(get({a: 'ok'}, 'a'), 'ok', 'get prop')
  t.equals(get({a: {b: 'ok'}}, 'a.b'), 'ok', 'get nested prop')
  t.equals(get({a: {b: 'ok'}}, ['a', 'b']), 'ok', 'get nested prop array notation')
  t.notOk(get({a: {b: 'ok'}}, 'a.c.d'), 'get nonexistent nested robust')
  t.end()
})

test('async', (t) => {
  t.end()
})

function testI (t, itera, iterb, name) {
  return t.deepEquals(arrayI(itera), arrayI(iterb), name)
}

function identity (a) { return a }
