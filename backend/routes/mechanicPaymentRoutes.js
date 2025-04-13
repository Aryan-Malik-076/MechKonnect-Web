const express = require('express');
const router = express.Router();
const MechanicPayment = require('../models/MechanicPayment');

router.post('/', async (req, res) => {
  try {
    const paymentData = {
      mechanicName: req.body.mechanicName,
      userId: req.body.userId,
      amount: req.body.amount,
      paymentMethod: req.body.paymentMethod,
      cardDetails: req.body.cardDetails,
      status: 'completed',
    };

    const payment = new MechanicPayment(paymentData);
    await payment.save();
    
    res.status(201).json({
      message: 'Payment processed successfully',
      payment: {
        id: payment._id,
        mechanicName: payment.mechanicName,
        amount: payment.amount,
        status: payment.status,
        createdAt: payment.createdAt,
      },
    });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ message: 'Failed to process payment', error: error.message });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const payments = await MechanicPayment.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payments', error: error.message });
  }
});

module.exports = router;