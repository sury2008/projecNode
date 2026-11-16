import { isValidObjectId } from "mongoose";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import { AppError } from "../utils/AppError.js";

export const getAllOrders = async (req, res) => {
    const orders = await Order.find();
    return res.json(orders);
};

export const getOrderById = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new AppError("invalid order id", 400, "bad-request");
    }

    const order = await Order.findById(id);

    if (!order) {
        throw new AppError("order not found", 404, "not-found");
    }

    return res.json(order);
};

export const addOrder = async (req, res) => {
    const productIds = req.body.products.map(({ _id }) => _id.toLowerCase());

    const products = await Product.find({ _id: { $in: productIds } });

    const productsById = new Map(products.map((product) => [product.id.toLowerCase(), product]));

    if (productsById.size !== new Set(productIds).size) {
        throw new AppError("one or more products were not found", 404, "not-found");
    }

    const order = new Order({
        date: req.body.date ?? new Date(),
        address: req.body.address,
        products: req.body.products.map(({ _id, amount }) => {
            const product = productsById.get(_id.toLowerCase());
            return {
                _id: product._id,
                name: product.name,
                price: product.price,
                amount,
            };
        }),
    });

    
    await order.save();

    return res.status(201).json(order);
};