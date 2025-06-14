require('dotenv').config();

const express = require("express");
const app = express()
const path = require('path');
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const cors = require("cors");


const productRoutes = require("./src/routes/productRoutes");
const userRoutes = require("./src/routes/userRoutes");
const cartRoutes = require("./src/routes/cartRoutes");

// const localdb_url = 'mongodb://localhost:27017/yuu-furniture'
const dburl = process.env.DB_URL;

console.log("DB URL:", dburl);

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
app.use(cors());
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// const categories = ["storage_furniture", "small_storage", "sofas・armchairs", "textiles", 
//     "beds・mattresses", "tables・chairs", "desk・deskchairs", "lighting", "rugs・mats", 
//     "decoration", "kitchenware・tableware", "bathroom_products", "kitchen・appliances"];



app.get('/', (req, res) => {
    res.send('Welcome to the home page!!!!')
})

const handleValidationErr = err => {
    console.dir(err);
    return new AppError(`Validation Failed...${err.message}`, 400)
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if (err.name === 'ValidationError') err = handleValidationErr(err)
    next(err);
})

app.use((err, req, res, next) => {
    const { status = 500, message = '何らかのサーバーエラーが発生しました' } = err;
    console.error("An error occured:", message);
    return res.status(status).json({ message });
})


app.listen(3000, () => {
    console.log("Listening on port 3000")
})