# OMOS

Object mapper on steroid.

OMOS helps you map transform your object with ease.

## Installation
To install OMOS:
`npm install --save omos`
or if you prefer Yarn:
`yarn add omos`

## Features
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
The result should be:
```javascript
{
  profile: {
    fullName: "Micheal Jordan",
    homeLocation: "Chicago",
  },
  accountInformation: {
    hobbies: [ 'Play Basketball', 'Play Golf', 'Count Rings' ],
  },
  carrer: {
    mostPoint: 69,
  },
};
```


## OMOS Schema explained
Schema for OMOS is is javascript object that requires a key named `properties`
The value of `properties` is a array of matches.
Each match must contains `from` and `to` key value, which is the key path to value of source object and target object.
```javascript
{
  from: "accountInformation.address.state",
  to: "profile.homeLocation",
}
```
OMOS will fetch the data (even undefined) and write it to new object.
But we all know that life is not simple like that. In some scenarioes, we need to compute the result value based on one or multiple fields in source object. You can use `compute` function to do such things.
In case of multiple inputs, the order will be kept when value will be pass to `compute`.
```javascript
{
  from: "to",
  to: "destination",
  compute: (value) => {
    return value.toUpperCase();
  }
}

{
  from: ["accountInformation.firstName", "accountInformation.lastName"],
  to: "profile.fullName",
  compute: (firstName, lastName) => `${firstName} ${lastName}`,
}
```

## Contribution guide
Any contribution to this module is appreacited. Just fork the repo then send a merge reqeuest.