import transformWith from '../src/transformWith';

// Fixtures
import { simpleObject, simpleResult } from './fixtures/objects';
import { simpleSchema, missingSchema, wrongSchema } from './fixtures/schemas';

describe('transformWith', () => {
  test('should be a function',() => {
    expect(transformWith).toBeInstanceOf(Function);
  });

  test('should throw an error if schema properties is missing', () => {
    expect(() => {
      transformWith(missingSchema, simpleObject)
    }).toThrow(new Error("Schema.properties is missing"));
  });

  test('should throw an error if schema properties is not an array', () => {
    expect(() => {
      transformWith(wrongSchema, simpleObject);
    }).toThrow(new Error("Schema.properties should be an array"));
  })

  test('can translate simple mapping schema', () => {
    expect(transformWith(simpleSchema, simpleObject)).toEqual(simpleResult);
  });
});