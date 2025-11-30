import express from 'express';
import { checkPaymentSuccess, createPaymentIntent, getPaymentStatus } from '../controllers/stripe.controller.js';


const stripeRouter = express.Router();

stripeRouter.post('/create-payment-intent',createPaymentIntent)
stripeRouter.post('/check-payment-status',getPaymentStatus)
stripeRouter.post('/check-payment-success',checkPaymentSuccess)

export default stripeRouter;