import { model, Schema, SchemaTypes } from "mongoose";

const orderSchema = new Schema({
    date: Date,
    address: {
        city: { type: String, required: true },
        street: String,
        num: Number,
    },
    products: [{
        _id: { type: SchemaTypes.ObjectId, ref: "products" },
        name: String,
        price: Number,
        amount: Number,
    }],
});

const Order = model("orders", orderSchema);

export default Order;