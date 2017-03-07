const transformWith = (schema, sourceObject) => {
  
  /**
   * Validate schema
   */
  const { properties } = schema;
  /**
   * If properties is missing from schema, throw an error
   */
  if (!properties) {
    throw new Error("schema.properties is missing");
  }

  /**
   * Throw an error if properties is not an array
   */
  if (!(properties instanceof Array)) {
    throw new Error("schema.properties should be an array");
  }
  
  /**
   * Transform from source objects based on schema
   */
  const transformedProperties = properties.map(match => {
    const { from, to, compute } = match;
    const computeExistence = (compute || typeof compute !== 'undefined');

    /**
     * Throw an error if 'from' is missing from property
     */
    if (!from) {
      throw new Error("schema.properties.from is missing");
    }

    /**
     * Throw an error if 'to' is missing from property
     */
    if (!to) {
      throw new Error("schema.properties.to is missing");
    }

    /**
     * If 'from' is an array but the 'compute' function  doesn't exists throw an Error
     */
    if (from instanceof Array && (!computeExistence)) {
      throw new Error("schema.properties.from is an array but schema.properties.compute is undefined");
    }

    /**
     * If compute function exists, pass the value through
     */
    if (computeExistence) {
      /**
       * Throw an error if compute is not a function
       */
      if (!(typeof compute === 'function')) {
        throw new Error("schema.properties.compute is not a function");
      } else {
        
        /**
         * If from is an array, pass it as kwagrs to compute function
         */
        if (from instanceof Array) {
          const args = from.map(f => {
            return sourceObject[f];
          });

          return {
            [match.to]: compute(...args)
          };
        }

        /**
         * Return computed value
         */
        return {
          [match.to]: compute(sourceObject[match.from]),
        };
      }
    }

    return {
      [match.to]: sourceObject[match.from],
    };
  });

  /**
   * Merge transformed properties in to result object
   */
  const result = transformedProperties.reduce((rObject, tProp) => {
    return Object.assign({}, rObject, tProp);
  });

  return result;
}

export default transformWith;