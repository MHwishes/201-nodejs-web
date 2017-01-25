var mongoose = require('mongoose');

var Schema = mongoose.Schema({
    categoryId: String,
    categoryName: String,
    cartId: String
});

module.exports = mongoose.model("Category", Schema);