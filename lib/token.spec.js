const jwt = require('jsonwebtoken');
const Spy = require('jasmine-spy');
const TestHelper = require('simple-bearer-token-test-helper');
const Token = require('./token');

const errors = {
  'TOKEN_REQUIRED': 'token string is required',
  'KEY_REQUIRED': 'options.secretOrPublicKey is required to verify the token',
};

describe('Token', () => {
  let testHelper, options, originalVerifyMethod, token;

  beforeEach(() => {
    originalVerifyMethod = jwt.verify;
    jwt.verify = Spy.create();
    testHelper = new TestHelper();
  });

  afterEach(() => {
    jwt.verify = originalVerifyMethod;
  });

  describe('constructor()', () => {
    describe('no string token passed', () => {
      it('should throw an error', () => {
        expect(() => {
          token = new Token();
        }).toThrowError(errors.TOKEN_REQUIRED);
      });
    });

    describe('no options passed', () => {
      it('should throw an error', () => {
        expect(() => {
          token = new Token('my-token');
        }).toThrowError(errors.KEY_REQUIRED);
      });
    });

    describe('with valid token string', () => {
      beforeEach(() => {
        testHelper.setupValidToken();
        options = {
          'secretOrPublicKey': testHelper.keys.public,
        };
      });

      describe('without key to decode', () => {
        it('should throw an error', () => {
          delete options.secretOrPublicKey;
          expect(() => {
            token = new Token(testHelper.tokenString, options);
          }).toThrowError(errors.KEY_REQUIRED);
        });
      });

      it('should verify the token using jwt module', () => {
        token = new Token(testHelper.tokenString, options);
        expect(jwt.verify).toHaveBeenCalledTimes(1);
        expect(jwt.verify).toHaveBeenCalledWith(testHelper.tokenString,
          options.secretOrPublicKey, options);
      });

      describe('when the verification fails', () => {
        beforeEach(() => {
          jwt.verify = Spy.throwError('something went wrong');
        });
        it('should fail with the error', () => {
          expect(() => {
            token = new Token(testHelper.tokenString, options);
          }).toThrowError('something went wrong');
        });
      });

      describe('when the verification is successful', () => {
        beforeEach(() => {
          jwt.verify = Spy.returnValue(testHelper.payload);
        });
        it('should return a token object with the information decoded', () => {
          token = new Token(testHelper.tokenString, options);
          expect(token.header).toEqual(testHelper.header);
          expect(token.payload).toEqual(jasmine.objectContaining(testHelper.payload));
          expect(token.signature).toEqual(testHelper.signature);
        });

        it('should set the raw property with the token string', () => {
          token = new Token(testHelper.tokenString, options);
          expect(token.raw).toEqual(testHelper.tokenString);
        });
      });
    });

    describe('with valid token string with "Bearer " prefix', () => {
      beforeEach(() => {
        testHelper.setupValidToken();
        options = {
          'secretOrPublicKey': testHelper.keys.public,
        };
      });
      it('should work removing the bearer prefix', () => {
        token = new Token(testHelper.bearerTokenString, options);
        expect(token.header).toEqual(testHelper.header);
        expect(token.payload).toEqual(jasmine.objectContaining(testHelper.payload));
        expect(token.signature).toEqual(testHelper.signature);
        expect(token.raw).toEqual(testHelper.tokenString);
      });
    });
  });
});
