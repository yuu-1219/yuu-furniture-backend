require('dotenv').config();

const express = require("express");
const app = express()
const router = express.Router();
const path = require('path');
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const cors = require("cors");

// const Cart = require("../models/cart")
const cartController = require("../controllers/cartController");

const dburl = process.env.DB_URL;

mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!")
    console.log(err)
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(cors())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



//ユーザーのカート情報を取得
router.get("/:userId", cartController.cartDetail)

//カート情報登録
router.post('/', cartController.registerCart)

//カート情報更新
router.put('/:userId', cartController.updateCart)

//カート情報削除
router.delete('/:userId', cartController.deleteCart)


module.exports = router;
