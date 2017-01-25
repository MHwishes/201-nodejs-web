import mongoose from 'mongoose';
import express from 'express';
import config from 'config';
import router from './router';
import bodyParser from 'body-parser';

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
    extended: false
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