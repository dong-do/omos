export const getValueFromSourceObject = (key, source) => {
  const splitedKey = (typeof key === 'object')? key : key.split('.');
  const currentKey = splitedKey.shift();
  if (typeof source[currentKey] === 'object' && !(Array.isArray(source[currentKey]))) {
    return getValueFromSourceObject(splitedKey, source[currentKey]);
  } else {
    return source[currentKey];
  }
}

export const writeValueToResult = (key, value, resultObject) => {
  const splitedKey = (typeof key === 'object')? key : key.split('.');
  
  if (splitedKey.length === 1) {
    resultObject[splitedKey[0]] = value;
  } else {
    const currentKey = splitedKey.shift();
    resultObject[currentKey] = writeValueToResult(splitedKey, value, typeof resultObject[currentKey] === 'undefined' ? {} : resultObject[currentKey]);
  }

  return resultObject;
}