import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import stripe from "../configs/stripe.js";

//place Order
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address, paymentType } = req.body;
    if (!address || !Array.isArray(items) || items.length === 0)
      return res.json({ success: false, message: "Invalid data" });

    const itemsIds = items.map((item) => item.product);
    const products = await Product.find({
      // database products
      _id: { $in: itemsIds },
    });

    if (products.length !== items.length)
      return res.json({ success: false, message: "Some products not found" });

    let amount = 0;
    for (const item of items) {
      const product = products.find((p) => String(p._id) === item.product);
      if (!product)
        return res.json({
          success: false,
          message: `Product not found: ${item.product}`,
        });

      amount += product.price * item.quantity;
    }
    //add tax charge(2%)
    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType,
    });

    return res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Failed to place order",
      error: error.message,
    });
  }
};

export const placeOrderOnline = async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ message: "Not Authorized" });
  }
  
  const {items, address, paymentType="Online", paymentIntentId, amount } =
    req.body;

  if (!paymentIntentId) {
    return res.json({ success: false, message: "payment not varified" });
  }

  try {
    // validate items & address
    if (!address || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    // verify products and compute amount server-side to avoid tampering
    const itemsIds = items.map((item) => item.product);
    const products = await Product.find({ _id: { $in: itemsIds } });

    if (products.length !== items.length) {
      return res.status(400).json({ success: false, message: "Some products not found" });
    }

    let computedAmount = 0;
    for (const item of items) {
      const product = products.find((p) => String(p._id) === item.product);
      if (!product) {
        return res.status(400).json({ success: false, message: `Product not found: ${item.product}` });
      }
      computedAmount += product.price * item.quantity;
    }
    // add tax charge(2%)
    computedAmount += Math.floor(computedAmount * 0.02);
    // amount passed to this endpoint is expected to be in cents from Stripe, convert to normal amount
    const amountFromClient = typeof amount === "number" ? amount / 100 : 0;
    // Use computed amount if mismatch
    const amountInDollars = Math.abs(computedAmount - amountFromClient) < 0.01 ? amountFromClient : computedAmount;

    // Verify payment intent status with Stripe to ensure it's succeeded
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      if (!paymentIntent || paymentIntent.status !== 'succeeded') {
        return res.status(400).json({ success: false, message: 'Stripe payment not confirmed' });
      }
    } catch (stripeError) {
      console.error('Stripe verify error:', stripeError);
      return res.status(400).json({ success: false, message: 'Invalid paymentIntentId' });
    }

    // Create order using fields matching Order schema
    const order = await Order.create({
      userId,
      items,
      amount: amountInDollars,
      address,
      paymentType: "Online",
      isPaid: true,
      status: "Order Placed",
    });

    console.log("Order created successfully (online):", order._id);
    return res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("Failed to create order (online):", error);
    return res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: error.message,
    });
  }
};

// Get Orders by User Id : get order for each individual user
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate({ path: "items.product", model: "Product" })
      .populate("address")
      .sort({ createdAt: -1 });
    return res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// Get all orders for seller or admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    return res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Internal server error" });
  }
};
