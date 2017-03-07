export const simpleSchema = {
  properties: [
    {
      from: "from",
      to: "origin",
    },
    {
      from: "to",
      to: "destination",
    },
  ],
};

export const missingSchema = {};
export const wrongSchema = {
  properties: {},
};

export const fromMissingSchema = {
  properties: [
    {
      to: "origin",
    },
    {
      from: "to",
      to: "destination",
    },
  ],
};

export const toMissingSchema = {
  properties: [
    {
      from: "from",
      to: "origin",
    },
    {
      from: "to",
    },
  ],
};

export const schemaWithFunction = {
  properties: [
    {
      from: "from",
      to: "origin",
    },
    {
      from: "to",
      to: "destination",
      compute: (value) => {
        return value.toUpperCase();
      }
    }
  ]
}

export const processIsNotAFunctionSchema = {
  properties: [
    {
      from: "from",
      to: "origin",
    },
    {
      from: "to",
      to: "destination",
      compute: "",
    }
  ]
}

export const multipleInputSchema = {
  properties: [
    {
      from: ["from", "country"],
      to: "origin",
      compute: (value1, value2) => {
        return `${value1} - ${value2}`;
      }
    },
    {
      from: ["to", "country"],
      to: "destination",
      compute: (to, country) => {
        return `${to} - ${country}`;
      }
    },
  ]
}

export const multipleInputMissingComputeSchema = {
  properties: [
    {
      from: ["from", "country"],
      to: "origin",
    },
    {
      from: "to",
      to: "destination",
    },
  ]
}