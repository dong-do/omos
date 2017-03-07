import transformWith from '../src/transformWith';

// Fixtures
import {
  simpleObject,
  simpleResult,
  capitalizedResult,
  arrayFromObject,
  arrayFromResult,
  multipleInputResult,
  multipleInputObject,
  realWorldObject,
  realWorldResult
} from './fixtures/objects';
import {
  simpleSchema,
  missingSchema,
  wrongSchema,
  fromMissingSchema,
  toMissingSchema,
  schemaWithFunction,
  processIsNotAFunctionSchema,
  multipleInputSchema,
  multipleInputMissingComputeSchema,
  realWorldSchema
} from './fixtures/schemas';

describe('transformWith', () => {
  test('should be a function',() => {
    expect(transformWith).toBeInstanceOf(Function);
  });

  test('should throw an error if schema properties is missing', () => {
    expect(() => {
      transformWith(missingSchema, simpleObject)
    }).toThrow(new Error("schema.properties is missing"));
  });

  test('should throw an error if schema properties is not an array', () => {
    expect(() => {
      transformWith(wrongSchema, simpleObject);
    }).toThrow(new Error("schema.properties should be an array"));
  });

  test(`should throw an error if 'from' is missing from property `, () => {
    expect(() => {
      transformWith(fromMissingSchema, simpleObject);
    }).toThrow(new Error("schema.properties.from is missing"));
  });

  test(`should throw an error if 'to' is missing from property `, () => {
    expect(() => {
      transformWith(toMissingSchema, simpleObject);
    }).toThrow(new Error("schema.properties.to is missing"));
  });

  test(`should throw an error if 'compute' is not a function`, () => {
    expect(() => {
      transformWith(processIsNotAFunctionSchema, simpleObject);
    }).toThrow(new Error("schema.properties.compute is not a function"));
  });

  test('can transform simple mapping schema', () => {
    expect(transformWith(simpleSchema, simpleObject)).toEqual(simpleResult);
  });

  test('can map properties which is array', () => {
    expect(transformWith(simpleSchema, arrayFromObject)).toEqual(arrayFromResult);
  });

  test('can transform with a compute function', () => {
    expect(transformWith(schemaWithFunction, simpleObject)).toEqual(capitalizedResult);
  });

  test(`should throw an error if from is an array but compute is undefined`, () => {
    expect(() => {
      transformWith(multipleInputMissingComputeSchema, multipleInputObject);
    }).toThrow(new Error('schema.properties.from is an array but schema.properties.compute is undefined'));
  });

  test('can compute multiple input', () => {
    expect(transformWith(multipleInputSchema, multipleInputObject)).toEqual(multipleInputResult);
  });

  test('can transform deep nested object', () => {
    expect(transformWith(realWorldSchema,realWorldObject)).toEqual(realWorldResult)
  });
});