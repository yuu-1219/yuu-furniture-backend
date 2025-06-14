require('dotenv').config();

const express = require("express");
const app = express()
const router = express.Router();
const path = require('path');
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const cors = require("cors");

// const User = require("../models/user")
const userController = require("../controllers/userController");

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



//ユーザー情報を取得
router.get('/:id', userController.userDetail)

//ログイン処理
router.post("/login", userController.login)

//ユーザー情報登録
router.post('/', userController.registerUser)

//ユーザー情報更新
router.put('/:id', userController.updateUserInfo)

//ユーザー情報更新
router.put('/:id/password', userController.updateUserPassword)

//ユーザー情報削除
router.delete('/:id', userController.deleteUser)


module.exports = router;