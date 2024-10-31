import express from "express";
import { checkout, completeCheckout } from "../controllers/subscription.js";

const router = express.Router();

router.post('/checkout', checkout)

router.get('/complete', completeCheckout)


export default router