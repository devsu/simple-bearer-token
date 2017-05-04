# simple-bearer-token

A module that creates and returns a token `object` from a bearer token `string`.

[![Build Status](https://travis-ci.org/devsu/simple-bearer-token.svg?branch=master)](https://travis-ci.org/devsu/simple-bearer-token)
[![Coverage Status](https://coveralls.io/repos/github/devsu/simple-bearer-token/badge.svg?branch=master)](https://coveralls.io/github/devsu/simple-bearer-token?branch=master)

## Installation

```bash
npm i --save simple-bearer-token
```

## How to use

```js
const Token = require('simple-bearer-token');

const bearerTokenString = 'Get the token from your request, (or from anywhere)';
const options = {
  'secretOrPublicKey': 'shhhh',
};
const token = new Token(bearerTokenString, options); 
```

If the token is valid, it will return the object. Otherwise, it will throw an error.

## Options

| Option            | Description                                                                                                             |
|-------------------|-------------------------------------------------------------------------------------------------------------------------|
| secretOrPublicKey | a string or buffer containing either the secret for HMAC algorithms, or the PEM encoded public key for RSA and ECDSA    |

Any option of the [verify](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback) method of the [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) module:

- algorithms
- audience
- issuer
- ignoreExpiration
- subject
- clockTolerance
- maxAge
- clockTimestamp

Such options will be used to verify the token.

## License and Credits

MIT License. Copyright 2017 

Built by the [Node.JS experts](https://devsu.com) at Devsu.
