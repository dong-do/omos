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