const validatePaymentSession = require('../../utils/validatePaymentSession');

describe('validatePaymentSession', () => {
  it('returns true for valid session with id', () => {
    const session = { id: 'cs_test_valid_123' };
    expect(validatePaymentSession(session)).toBe(true);
  });

  it('returns false if session is null', () => {
    expect(validatePaymentSession(null)).toBe(false);
  });

  it('returns false if session id is missing', () => {
    expect(validatePaymentSession({})).toBe(false);
  });

  it('returns false if session id is not a string', () => {
    expect(validatePaymentSession({ id: 12345 })).toBe(false);
  });
});
