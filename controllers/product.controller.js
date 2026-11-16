import { isValidObjectId } from "mongoose";
import Product from "../models/product.model.js";
import { AppError } from "../utils/AppError.js";

export const getAllProducts = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const products = await Product.find()
        .skip((page - 1) * limit)
        .limit(limit);

    const total = await Product.countDocuments();

    res.json({ data: products, total });
};

export const getProductById = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new AppError("product not found", 404, "not-found");
    }

    const product = await Product.findById(id);

    if (!product) {
        throw new AppError("product not found", 404, "not-found");
    }

    return res.json(product);
};

export const addProduct = async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new AppError("product not found", 404, "not-found");
    }

    const product = await Product.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true, runValidators: true }
    );

    if (!product) {
        throw new AppError("product not found", 404, "not-found");
    }

    return res.json(product);
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params; // פרמטר חובה: מזהה המשאב

    if (!isValidObjectId(id)) {
        throw new AppError("product not found", 404, "not-found");
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
        throw new AppError("product not found", 404, "not-found");
    }

    return res.status(204).send();
};