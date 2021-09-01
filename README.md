# get-type

Poking around this "get-type" thing.

The original question was asked by [@joelnet](https://twitter.com/joelnet/status/1432806592118882307).

> Would you write this #JavaScript function differently? How would you write it?

```javascript
const getType = (node) =>
  yaml.isAlias(node) ? "ALIAS"
    : yaml.isMap(node) ? "MAP"
    : yaml.isPair(node) ? "PAIR"
    : yaml.isScalar(node) ? "SCALAR"
    : yaml.isSeq(node) ? "SEQ"
    : yaml.isCollection(node) ? "COLLECTION"
    : yaml.isNode(node) ? "NODE"
    : "UNKNOWN";
```

## My solution

Most of the code lives in [test/](test/) folder.

```javascript
const getType2 = (yaml, node) =>
  ['Alias', 'Map', 'Pair', 'Scalar', 'Seq', 'Collection', 'Node']
    .find(m => yaml['is' + m](node))?.toUpperCase() || 'UNKNOWN'
```

```javascript
const getType = (yaml, node) =>
  ['Alias', 'Map', 'Pair', 'Scalar',
   'Seq', 'Collection', 'Node']
    .reduce((a, c) =>
      a + (a == '' ? (yaml[`is${c}`](node) ? c : '') : ''), '')
    .toUpperCase() || 'UNKNOWN'
```


## Development && testing

```bash
# Install yarn and dependencies...
npm i yarn && rm -rf package-lock.json && yarn install

# Run tests
mocha

# Lint
eslint
```

[Oto Brglez - @otobrglez](https://twitter.com/otobrglez)
