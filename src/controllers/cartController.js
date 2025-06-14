const Cart = require("../models/cart");
const AppError = require("../utils/AppError");
const wrapAsync = require("../utils/wrapAsync");


module.exports.cartDetail = wrapAsync(async (req, res, next) => {
    const { userId } = req.params;
    const foundCart = await Cart.findOne({ userId });

    if (!foundCart) {
        throw new AppError("該当するカートデータが存在しません", 404);
    }

    res.status(200).json(foundCart);
})

module.exports.registerCart = wrapAsync(async (req, res, next) => {
    const cartData = {
        ...req.body,
    };
    const newCart = new Cart(cartData);
    await newCart.save();

    if (!newCart) {
        throw new AppError("カートデータが正しく登録されませんでした", 500);
    }

    res.status(201).json(newCart);
})

module.exports.updateCart = wrapAsync(async (req, res, next) => {
    const { userId } = req.params;
    const updatedCart = await Cart.findOneAndUpdate({ userId }, req.body, { runValidators: true, new: true });

    if (!updatedCart) {
        throw new AppError("該当するカートデータが存在しません", 404);
    }

    res.status(200).json(updatedCart);
})

module.exports.deleteCart = wrapAsync(async (req, res, next) => {
    const { userId } = req.params;
    const deletedCart = await Cart.findOneAndDelete({ userId });

    if (!deletedCart) {
        throw new AppError("該当するカートデータが存在しません", 404);
    }
    res.status(200).json(deletedCart);
})