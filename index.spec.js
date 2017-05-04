const SimpleBearerToken = require('./index');
const Token = require('./lib/token');

describe('simple-bearer-token', () => {
  it('must expose Token class', () => {
    expect(SimpleBearerToken).toEqual(Token);
  });
});
