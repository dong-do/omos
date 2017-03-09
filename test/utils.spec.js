import { getValueFromSourceObject, writeValueToResult } from '../src/utils';

describe('Utils', () => {
  test('can get value from deep nested object', () => {
    expect(getValueFromSourceObject("very.deep.value", {
      very: {
        deep: {
          value: "Hello World",
        },
      },
    })).toEqual("Hello World");
  });

  test('return undefined if the path does not exist', () => {
    expect(getValueFromSourceObject("path.not.exists", {
      path: {
        exist: "Hello",
      }
    })).toEqual(undefined);
  });

  test('can get value from deep nested object which is a array', () => {
    expect(getValueFromSourceObject("very.deep.value", {
      very: {
        deep: {
          value: ["Hello", "World"],
        },
      },
    })).toEqual(["Hello", "World"]);    
  });

  test('can write value to deep nested object', () => {
    expect(writeValueToResult("very.deep.value", ["Hello", "World"], {})).toEqual({
      very: {
        deep: {
          value: ["Hello", "World"],
        },
      },      
    })
  });
});