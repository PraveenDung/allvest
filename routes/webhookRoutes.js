const express = require('express');
const router = express.Router();
const { handleStripeWebhook } = require('../controllers/webhookController');

// Important: Stripe requires raw body parser!
router.post('/stripe', handleStripeWebhook);

module.exports = router;
