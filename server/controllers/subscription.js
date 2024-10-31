import dotenv from "dotenv";
dotenv.config();

import Stripe from 'stripe';
import User from "../models/User.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const checkout = async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Premium Subscription",
                description: "Access premium features and statistics",
              },
              unit_amount: 9.99 * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.DOMAIN}/subscription/complete?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.DOMAIN}/subscription/cancel`,
      });
  
      res.status(200).json({ error: false, message: "Checkout session has been successfully created", url: session.url });
    } catch (error) {
      res.status(500).json({ error: true, message: "Checkout session failed" });
    }
}

export const completeCheckout = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    
        if (session.payment_status === 'paid') {
            await User.findByIdAndUpdate(req.user._id, { isPremium: true });
            res.status(200).redirect(`${process.env.FE_DOMAIN}/get-premium/success`);
        } else {
            res.status(500).redirect(`${process.env.FE_DOMAIN}/get-premium/failed`);
        }

    } catch (error) {
        res.status(500).redirect(`${process.env.FE_DOMAIN}/get-premium/failed`);
    }
}

