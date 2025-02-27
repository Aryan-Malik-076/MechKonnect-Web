const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_your_secret_key');
const Payment = require('../models/Payment');

router.post('/pay', async (req, res) => {
    try {
        const { token, amount, userId, mechanicId } = req.body;

        const charge = await stripe.charges.create({
            amount: amount * 100, // Stripe accepts amounts in cents
            currency: 'pkr',
            source: token,
            description: `Payment by user ${userId} for mechanic ${mechanicId}`
        });

        const payment = new Payment({
            userId,
            mechanicId,
            amount,
            status: charge.status
        });

        await payment.save();
        res.json({ success: true, charge, message: 'Payment successful' });
    } catch (error) {
        console.error('Payment Error:', error);
        res.status(500).json({ success: false, message: 'Payment failed', error });
    }
});

module.exports = router;
