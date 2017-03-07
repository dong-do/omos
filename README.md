# OMOS

Object mapper on steroid.

OMOS helps you map transform your object with ease 

## Installation
To install OMOS:
`npm install --save omos`
or if you perper yarn:
`yarn add omos`

## Features
---
#### Transform object
OMOS is a function that will take a schema as the first argument and source object as second argument and return the result. Simple as that!

```javascript
import transformWith from 'omos';

const schema = {
  properties: [
    {
      from: "accountInformation.address.state",
      to: "profile.homeLocation",
    },
    {
      from: "accountInformation.hobbies",
      to: "accountInformation.hobbies",
    },
    {
      from: ["accountInformation.firstName", "accountInformation.lastName"],
      to: "profile.fullName",
      compute: (firstName, lastName) => `${firstName} ${lastName}`,
    },
    {
      from: "nbaProfile.mostPointPerGame",
      to: "carrer.mostPoint",
    },
  ],
};

const sourceObject = {
  accountInformation: {
    firstName: "Micheal",
    lastName: "Jordan",
    hobbies: ["Play Basketball", "Play Golf", "Count Rings"],
    address: {
      state: "Chicago"
    }
  },
  nbaProfile: {
    mostPointPerGame: 69,
  },
}

const result = transformWith(schema, sourceObject);

```
