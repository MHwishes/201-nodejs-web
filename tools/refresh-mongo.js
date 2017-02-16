const mongoose = require('mongoose');
const Cart = require('../model/cart');
const Category = require('../model/category');
const Item = require('../model/item');
const rawData = require('./raw-data/raw-data');

const modelsMap = {Item, Category, Cart};

let docs = Object.keys(rawData);
// mongoose.connect('mongodb://localhost/supermarket');

module.exports = function refresh() {
    Object.keys(rawData).forEach(v => {
        modelsMap[v].remove(() => {
            modelsMap[v].create(rawData[v], () => {
                docs = docs.filter(doc => doc !== v);
                if (docs.length === 0) {
                    // process.exit(0);
                }
            });
        });
    });
};