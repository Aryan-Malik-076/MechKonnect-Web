import { Router } from "express";
import Payment from "../models/Paymentm.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { mechanicName, amount, paymentMethod, cardDetails } = req.body;

    const payment = new Payment({
      mechanicName,
      amount,
      paymentMethod,
      cardDetails: paymentMethod === "card" ? cardDetails : undefined,
    });

    await payment.save();
    res.status(201).json({ message: "Payment saved successfully", payment });
  } catch (error) {
    res.status(500).json({ message: "Error saving payment", error: error.message });
  }
});

export default router;