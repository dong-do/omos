export const getValueFromSourceObject = (key, source) => {
  const splitedKey = (typeof key === 'object')? key : key.split('.');

  return splitedKey.reduce((obj, key) => {
    if (obj) return obj[key] ? obj[key] : undefined;
    return undefined;
  }, source);
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