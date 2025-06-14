require('dotenv').config();

const express = require("express");
const app = express()
const router = express.Router();
const path = require('path');
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const cors = require("cors");

// const Product = require("../models/product");
const productController = require("../controllers/productController");

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


//全商品取得
router.post('/', productController.allProducts)

//ランキングtop5取得
router.post('/ranking', productController.topProducts)

//1つの商品を取得
router.get("/:id", productController.productDetail)


//商品情報登録フォーム
router.get('/new', productController.registerProductForm)

//商品情報登録
router.post('/register', productController.registerProduct)

//商品情報編集フォーム
router.get('/:id/edit', productController.editProductForm)

//商品情報更新
router.put('/:id', productController.updateProduct)

//商品情報削除
router.delete('/:id', productController.deleteProduct)

module.exports = router;
