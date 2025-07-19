const Company = require('../models/Company');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

// POST /payment/create
exports.createPaymentSession = async (req, res) => {
  const { companyId, quantity } = req.body;
  const user = req.user;

  try {
    const company = await Company.findById(companyId);
    if (!company) return res.status(404).json({ message: 'Company not found' });

    if (quantity > company.availableQuantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: {
            name: `${company.name} Stock`,
          },
          unit_amount: company.stockPrice * 100,
        },
        quantity,
      }],
      mode: 'payment',
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cancel`,
      metadata: {
        userId: user.id,
        companyId: company._id.toString(),
        quantity: quantity.toString(),
      },
    });

    return res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe session error:', err.message);
    res.status(500).json({ message: 'Payment creation failed' });
  }
};
