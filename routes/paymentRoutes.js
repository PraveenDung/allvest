const express = require('express');
const router = express.Router();
const { createPaymentSession } = require('../controllers/paymentController');
const authenticateJWT = require('../middlewares/authMiddleware');

// Protected POST /payment/create
router.post('/create', authenticateJWT, createPaymentSession);

module.exports = router;
