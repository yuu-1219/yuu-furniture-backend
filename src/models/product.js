const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    img: {
        //画像のアップロード時は画像をS3などに保存し、そのURLを格納
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: false,
        default: 0
    },
    category: {
        type: String,
        required: true,
        enum: ["storage_furniture", "small_storage", "sofas・armchairs", "textiles", 
            "beds・mattresses", "tables・chairs", "desk・deskchairs", "lighting", "rugs・mats", 
            "decoration", "kitchenware・tableware", "bathroom_products", "kitchen・appliances"]
    },
    rating: {
        type: Number,
        required: false,
        default: 0
    }
    
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;




// categoryId: "storage_furniture", categoryLabel: "収納家具",
// categoryId: "small_storage", categoryLabel: "小物収納",
// categoryId: "sofas・armchairs", categoryLabel: "ソファ＆パーソナルチェア",
// categoryId: "textiles", categoryLabel: "クッション&寝具",
// categoryId: "beds・mattresses", categoryLabel: "ベッド・マットレス",
// categoryId: "tables・chairs", categoryLabel: "テーブル・チェア",
// categoryId: "desk・deskchairs", categoryLabel: "デスク・チェア",
// categoryId: "lighting", categoryLabel: "照明",
// categoryId: "rugs・mats", categoryLabel: "ラグ・カーペット",
// categoryId: "decoration", categoryLabel: "インテリア雑貨",
// categoryId: "kitchenware・tableware", categoryLabel: "調理器具・食器",
// categoryId: "bathroom_products", categoryLabel: "洗面所収納・バスタオル",
// categoryId: "kitchen・appliances", categoryLabel: "キッチン収納",
