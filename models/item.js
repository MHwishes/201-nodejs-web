var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    name: String,
    price: String,
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category"
    }
});

module.exports = mongoose.model("Items", itemSchema);