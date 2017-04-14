const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

describe('App', () => {
  it('does things!', function(){
    expect('cats').to.equal('cats');
  });
});

describe('countItems', () => {
  it('returns an object with the count of each cleanliness type', () => {
    const array = [
      {id:1, name:'dead rat', reason: 'don\'t want to touch it', clean: 'rancid'},
      {id:2, name:'hoopdie', reason: 'dope old car', clean: 'dusty'}
    ]
    const count = {sparkling:5, dusty:3, rancid:1};
    
    assert.equal(countItems(array), count)
  })
})
