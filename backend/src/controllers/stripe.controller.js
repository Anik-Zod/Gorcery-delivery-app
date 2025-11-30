import stripe from "../configs/stripe.js";

//create payment intent
export const createPaymentIntent = async (req, res) => {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('[Stripe:createPaymentIntent] STRIPE_SECRET_KEY missing');
      return res.status(500).json({ error: 'Stripe is not configured on server' });
    }
    const { amount, currency, customer_email } = req.body;
    // Validate input
    if (!amount || !Number.isInteger(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount. Amount must be a positive integer in the smallest currency unit (e.g., cents).' });
    }
    if (!currency || typeof currency !== 'string') {
      return res.status(400).json({ error: 'Invalid currency.' });
    }
    if (!customer_email || typeof customer_email !== 'string') {
      return res.status(400).json({ error: 'Invalid customer email.' });
    }
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
      receipt_email: customer_email,
    });
    res.status(200).json({
      status: paymentIntent.status,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// check Payment status
export const getPaymentStatus = async (req, res) => {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('[Stripe:getPaymentStatus] STRIPE_SECRET_KEY missing');
      return res.status(500).json({ error: 'Stripe is not configured on server' });
    }
    const { paymentIntentId } = req.body;
    if (!paymentIntentId || typeof paymentIntentId !== 'string') {
      return res.status(400).json({ error: 'paymentIntentId must be a valid string' });
    }
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    res.status(200).json({
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      created: paymentIntent.created,
    });
  } catch (error) {
    console.error('[Stripe:getPaymentStatus] Error retrieving payment intent:', error);
    const stripeDebug = {
      type: error.type,
      code: error.code,
      statusCode: error?.statusCode,
      raw: error?.raw?.message || null,
    };
    res.status(500).json({ error: error.message, stripeDebug });
  }
};

//check Payment success or not
export const checkPaymentSuccess = async (req, res) => {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('[Stripe:checkPaymentSuccess] STRIPE_SECRET_KEY missing');
      return res.status(500).json({ error: 'Stripe is not configured on server' });
    }
    const { paymentIntentId } = req.body;
    if (!paymentIntentId || typeof paymentIntentId !== 'string') {
      return res.status(400).json({ error: 'paymentIntentId must be a valid string' });
    }
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
        res.status(400).json({ success: false, message: "Payment not successful" });
    }
    
    res.status(200).json({ success: true, message: "Payment successful" });

    } catch (error) {
      console.error('[Stripe:checkPaymentSuccess] Error checking payment success:', error);
      const stripeDebug = {
        type: error.type,
        code: error.code,
        statusCode: error?.statusCode,
        raw: error?.raw?.message || null,
      };
      res.status(500).json({ error: error.message, stripeDebug });
  }
};
