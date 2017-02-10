var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    categoryName: String
});

module.exports = mongoose.model("Category", categorySchema);