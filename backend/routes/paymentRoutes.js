import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Payment Route
router.post("/", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 300 * 100, // 300 PKR (converted to paisa)
      currency: "pkr",
      payment_method_types: ["card"],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
