const mongoose = require('mongoose');

var Schema = mongoose.Schema({
    cartId: String,
    items:Array
});

module.exports = mongoose.model("Cart", Schema);