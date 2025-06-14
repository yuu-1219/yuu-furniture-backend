const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true
    },

}, { _id: false });

module.exports = cartItemSchema;