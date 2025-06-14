const bcrypt = require('bcrypt');
const User = require("../models/user");
const AppError = require("../utils/AppError");
const sendEmail = require("../utils/mailer");
const wrapAsync = require("../utils/wrapAsync");


module.exports.userDetail = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const foundUser = await User.findById(id);

    if (!foundUser) {
        throw new AppError("該当するユーザーデータが存在しません", 404);
    }

    const { password: _, ...withoutPasswordUser } = foundUser.toObject();
    res.status(200).json(withoutPasswordUser);
})

module.exports.login = wrapAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });

    if (!foundUser) {
        throw new AppError("該当するユーザーデータが存在しません", 404);
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) {
        throw new AppError("パスワードが違います", 401);
    }

    const { password: _, ...withoutPasswordUser } = foundUser.toObject();
    res.status(200).json(withoutPasswordUser);
})

module.exports.registerUser = wrapAsync(async (req, res, next) => {
    const saltRounds = 10;
    const { userInfo, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userData = {
        ...userInfo,
        password: hashedPassword
    };
    const newUser = new User(userData);
    await newUser.save();

    if (!newUser) {
        throw new AppError("ユーザーデータが正しく登録されませんでした", 500);
    }

    const { password: _, ...withoutPasswordUser } = newUser.toObject();
    res.status(201).json(withoutPasswordUser);
})

module.exports.updateUserInfo = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const { updatedUser, isPurchase, orderId } = req.body;
    const foundUser = await User.findById(id);

    if (!foundUser) {
        throw new AppError("該当するユーザーデータが存在しません", 404);
    }

    const changedWithPasswordUser = {
        ...updatedUser,
        password: foundUser.password
    }
    const changedUser = await User.findByIdAndUpdate(id, changedWithPasswordUser, { runValidators: true, new: true });

    if (!changedUser) {
        throw new AppError("ユーザーデータが正しく変更されませんでした", 500);
    }

    if(isPurchase) {
        await sendEmail(changedUser.email, orderId);
    }

    const { password: _, ...withoutPasswordUser } = changedUser.toObject();
    res.status(200).json(withoutPasswordUser);
})

module.exports.updateUserPassword = wrapAsync(async (req, res, next) => {
    const saltRounds = 10;

    const { id } = req.params;
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const updatedUser = await User.findByIdAndUpdate(id, { password: hashedPassword }, { runValidators: true, new: true });

    if (!updatedUser) {
        throw new AppError("該当するユーザーデータが存在しません", 404);
    }

    const { password: _, ...withoutPasswordUser } = updatedUser.toObject();
    res.status(200).json(withoutPasswordUser);
})

module.exports.deleteUser = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
        throw new AppError("該当するユーザーデータが存在しません", 404);
    }

    const { password: _, ...withoutPasswordUser } = deletedUser.toObject();
    res.status(200).json(withoutPasswordUser);
})