const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
const ItemController = require('../controller/ItemController');

const Item = require('../models/item');

describe('ItemController', ()=> {

    it('POST insertItem should return a item', (done) => {
        const item = {
            id: '1',
            name: '苹果'
        };
        request
            .post('/item')
            .send(item)
            .expect(201)
            .expect((res) => {
                Item.find(item, (err, doc) => {
                    res.body.should.equal(doc);
                });
            })
            .end(done)
    });
});
