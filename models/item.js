var mongoose = require('mongoose');

var Schema = mongoose.Schema({
    id: String,
    name: String,
    categoryId: String
});

module.exports = mongoose.model("Items", Schema);