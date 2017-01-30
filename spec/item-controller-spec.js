const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
require('should');

const Item = require('../models/item');

describe('ItemController', ()=> {

    it('GET all  Item', (done) => {
        request
            .get('/Item')
            .expect(200)
            .end(done)
    });

    it('GET one  Item', (done) => {
        const item = {
            "id": "1",
            "name": "苹果",
            "categoryId": "1"
        };
        request
            .get('/Item/1')
            .expect(200)
            .expect((res) => {
                res.body.id.should.equal(item.id);
                res.body.name.should.equal(item.name);
            })
            .end(done)
    });

    it('DELETE one Item', (done)=> {
        request
            .delete('/Item/1')
            .expect(204)
            .end(done);
    });

    it('POST insertItem should return a Item', (done) => {
        const item = {
            id: '8',
            name: '苹果'
        };
        request
            .post('/Item')
            .send(item)
            .expect(201)
            .expect((res) => {
                Item.find(item, (err, doc) => {
                    res.body.should.equal(doc);
                });
            })
            .end(done)
    });

    it('PUT one Item', (done)=> {
        const item = {
            id: '10',
            name: "aaa"
        };
        request
            .put('/Item/2')
            .send(item)
            .expect(204)
            .end(done);
    })

});
