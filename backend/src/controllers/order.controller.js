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
    const products = await Product.find({ // database products
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
      paymentType
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
