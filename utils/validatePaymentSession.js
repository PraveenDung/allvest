function validatePaymentSession(session) {
  if (!session || typeof session.id !== 'string') {
    return false;
  }
  return true;
}

module.exports = validatePaymentSession;
