import chai from 'chai';
import transformWith from '../src/transformWith';

const expect = chai.expect;

describe('OMOS', () => {
  it('should be a function',() => {
    expect(transformWith).to.be.an.instanceof(Function);
  });
});