const transformWith = (schema, object) => {
  
  /**
   * Validate schema
   */
  const { properties } = schema;
  if (!properties) {
    throw new Error("Schema.properties is missing");
  }

  if (!(properties instanceof Array)) {
    throw new Error("Schema.properties should be an array");
  }
  
  const transformedProperties = properties.map(match => {
    return {
      [match.to]: object[match.from],
    };
  });

  const result = transformedProperties.reduce((rObject, tProp) => {
    return Object.assign({}, rObject, tProp);
  });

  return result;
}

export default transformWith;