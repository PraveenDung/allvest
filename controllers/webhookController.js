const Company = require("../models/Company");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const validatePaymentSession = require('../utils/validatePaymentSession');

//Stripe requires raw body for webhook signature verification
exports.handleStripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error("Webhook signature failed:", err.message);
        return res.status(400).send("Webhook Error: " + err.message);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        // Validate session before using it
        if (!validatePaymentSession(session)) {
            return res.status(400).send('Invalid session data');
        }

        const companyId = session.metadata.companyId;
        const quantity = parseInt(session.metadata.quantity);

        try {
            const company = await Company.findById(companyId);
            if (!company) return res.status(404).send('Company not found');

            // Decrease stock
            company.availableQuantity -= quantity;
            if (company.availableQuantity < 0) company.availableQuantity = 0;

            await company.save();
            console.log(`Stock updated for ${company.name}`);
        } catch (err) {
            console.error('Error updating stock:', err.message);
            return res.status(500).send('Stock update failed');
        }
    }

    res.json({ received: true });

};
