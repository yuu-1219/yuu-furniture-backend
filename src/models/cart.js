const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const cartItemSchema = require("./cartItemSchema");


const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: uuid(),
        required: false
    },
    items: [cartItemSchema],
    totalQty: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

})


const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;


