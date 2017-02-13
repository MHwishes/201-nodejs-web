var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    name: String,
    price: Number,
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category"
    }
});

module.exports = mongoose.model("Item", itemSchema);