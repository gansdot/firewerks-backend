import { Request, Response } from "express";
import Order from "../models/order.model.js";
import { createOrder } from "../services/payment.service.js";
import { sendOrderEmail } from "../utils/emailService.js";
import Product from "../models/product.model.js";

export const guestCheckout = async (req: Request, res: Response) => {
  try {

    const { items, email, shippingAddress, phone, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    if (!email) {
      return res.status(400).json({ message: "Guest must provide email" });
    }

    const order = await Order.create({
      user: null,
      items: items.map((i: any) => ({
        product: i.product,
        name: i.name,
        quantity: i.quantity,
        price: i.price,
      })),
      total,
      userEmail: email,
      userName: "Guest_".concat(phone),
      address: shippingAddress,
      status: "Processing",
    });

    const razorOrder = await createOrder(total);
    order.paymentId = razorOrder.id;
    await order.save();
    // update stock
    await Promise.all(
      items.map(async (item: any) => {
        const product = await Product.findById(item.product);
        if (product) {
          product.stock = Math.max(0, product.stock - item.quantity);
          await product.save();
        }
      })
    );

    // ✅ Send email
    const emailToSend =
      email || req.body.email || "gansdot@yahoo.com";

    await sendOrderEmail(emailToSend, order);

    res.json({ order, razorOrder });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const checkout = async (req: Request, res: Response) => {

  const { user } = req.body;

  try {

    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { items, email, total, shippingAddress } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Create order with user snapshot
    const order = new Order({
      user: user?._id,
      userName: user.name,       // snapshot
      userEmail: user.email,     // snapshot
      items: items.map((i: any) => ({
        product: i.product,
        name: i.name,
        quantity: i.quantity,
        price: i.price,
      })),
      total,
      shippingAddress,
      status: "Processing",
    });

    const razorOrder = await createOrder(total);

    order.paymentId = razorOrder.id;
    await order.save();

    await Promise.all(
      items.map(async (item: any) => {
        const product = await Product.findById(item.product);

        if (product) {
          product.stock = Math.max(0, product.stock - item.quantity);
          console.log("product stock ", product.stock);

          await product.save();
        }
      })
    );

    // ✅ Send email
    const emailToSend =
      email || req.body.email || "gansdot@yahoo.com";

    await sendOrderEmail(emailToSend, order);
    res.json({ order, razorOrder });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};


export const confirmOrder = async (req: Request, res: Response) => {
  try {
    const { orderId, paymentId } = req.body;
    //const order = await Order.findOne({ paymentId: orderId });
    const order = await Order.findOne({ paymentId: orderId });
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "Processing";
    order.paymentId = paymentId;
    await order.save();

    res.json({ message: "Payment confirmed", order });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;

    // Find order by ID and populate user + items (if models have refs)
    const order = await Order.findById(orderId)
      .populate("user", "name email phone") // optional
      .populate("items.product", "name price"); // optional

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (err) {
    console.error("getOrderById error:", err);
    res.status(500).json({ message: (err as Error).message });
  }
};
export const getGuestOrderById = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;

    // Find order by ID and populate user + items (if models have refs)
    const order = await Order.findById(orderId)
      .populate("user", "name email phone") // optional
      .populate("items.product", "name price"); // optional

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (err) {
    console.error("get Guest OrderById error:", err);
    res.status(500).json({ message: (err as Error).message });
  }
};


export const getUserOrders = async (req: Request, res: Response) => {
  try {

    const userId = (req as any).user._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Failed to load user orders" });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error("Update order error:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const page = parseInt((req as any).query.page) || 1;
    const limit = parseInt((req as any).query.limit) || 5;
    const skip = (page - 1) * limit;

    const totalOrders = await Order.countDocuments();
    const orders = await Order.find()
      .populate("user", "name email") // 👈 get user details
      .populate("items.product", "name price image") // optional

      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);


    res.json({
      orders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: page,
    });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};