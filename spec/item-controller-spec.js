const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
require('should');

const Item = require('../models/item');

describe('ItemController', ()=> {

    it('GET all  Item', (done) => {
        request
            .get('/item')
            .expect(200)
            .end(done)
    });

    it('GET one  Item', (done) => {
        const item = {
            "_id": "58885f0459c1ff4af245a76a",
            "id": "3",
            "name": "mhong",
            "__v": 0
        };
        request
            .get('/item/3')
            .expect(200)
            .expect((res) => {
                res.body._id.should.equal(item._id);
            })
            .end(done)
    });

    it('DELETE one item', (done)=> {
        request
            .delete('/item/8')
            .expect(204)
            .end(done);
    });

    it('POST insertItem should return a item', (done) => {
        const item = {
            id: '8',
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

    it('PUT one item', (done)=> {
        const item = {
            id: '1',
            name: "aaa"
        };
        request
            .put('/item/5')
            .send(item)
            .expect(204)
            .end(done);
    })

});
