const mongoose = require('mongoose');
const cart = require('../models/cart');
const category = require('../models/category');
const item = require('../models/item');
const rawData = require('./raw-data/raw-data');

const modelsMap = {item, category, cart};

let docs = Object.keys(rawData);
mongoose.connect('mongodb://localhost/supermarket');

Object.keys(rawData).forEach(v => {
    modelsMap[v].remove(() => {
        modelsMap[v].create(rawData[v], () => {
            docs = docs.filter(doc => doc !== v);
            if (docs.length === 0) {
                process.exit(0);
            }
        });
    });
});