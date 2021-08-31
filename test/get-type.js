const assert = require('assert');

const Yaml = class {
  /* eslint-disable no-unused-vars */
  isAlias(node){ return false }
  isMap(node){ return false }
  isPair(node){ return true }
  isScalar(node){ return false }
  isSeq(node){ return true }
  isCollection(node){ return false }
  isNode(node){ return true }
  /* eslint-enable no-unused-vars */
}

const yaml = new Yaml()

const getType = (node) => 
  yaml.isAlias(node) ? "ALIAS" 
    : yaml.isMap(node) ? "MAP"
    : yaml.isPair(node) ? "PAIR"
    : yaml.isScalar(node) ? "SCALAR"
    : yaml.isSeq(node) ? "SEQ"
    : yaml.isCollection(node) ? "COLLECTION"
    : yaml.isNode(node) ? "NODE"
    : "UNKNOWN";

const getType2 = (node) => 
  ['Alias', 'Map', 'Pair', 'Scalar', 'Seq', 'Collection', 'Node']
    .reduce((a, c) => a + (a == '' ? (yaml[`is${c}`](node) ? c : '') : ''), '')
    .toUpperCase() || 'UNKNOWN'

const getType21 = (yaml, node) => 
  ['Alias', 'Map', 'Pair', 'Scalar', 
   'Seq', 'Collection', 'Node']
    .reduce((a, c) => 
      a + (a == '' ? (yaml[`is${c}`](node) ? c : '') : ''), '')
    .toUpperCase() || 'UNKNOWN'

describe('get-type', () => {
  it('testing some random methods on "yaml"', () => {
    assert(yaml.isAlias() == false)
    assert(yaml.isMap() == false)
    assert(yaml.isPair())
    assert(yaml.isScalar() == false)
    assert(yaml.isSeq())
    assert(yaml.isCollection() == false)
    assert(yaml.isNode())
  })

  it('works on given example', () => {
    const node = { }
    assert.equal(getType(node), 'PAIR')
  })

  it('work on my code', () => {
    const node = {}
    assert.equal(getType2(node), 'PAIR')
  })

  it('work on my code - but better', () => {  
    const OtherYaml = class extends Yaml {
      /* eslint-disable no-unused-vars */
      isPair(node){ return false }
      isSeq(node){ return false }
      isNode(node){ return false }
      /* eslint-enable no-unused-vars */
    } 

    const yaml = new OtherYaml()
    assert.equal(getType21(yaml, {}), 'UNKNOWN')
  })
})
