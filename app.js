const mongoose = require('mongoose');
const express = require('express');
const config = require('config');
const router = require('./router');
const bodyParser = require('body-parser');

mongoose.connect(config.get('mongoUri'), function (err, connect) {
    if (err) {
        console.log('连接失败！');
        return;
    } else {
        console.log('连接成功！');
    }
});

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



app.get('/', (req, res)=> {
    res.send({
        'hello': 'world'
    })
});

router(app);

app.listen(config.get('httpPort'), ()=> {
    console.log('server started at http://localhost:' + config.get('httpPort'));   // eslint-disable-line no-console
});

module.exports = app;