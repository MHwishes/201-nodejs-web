const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
require('should');

const Item = require('../models/cart');

describe('CartController', ()=> {

    it('GET all  Carts', (done) => {
        request
            .get('/cart')
            .expect(200)
            .end(done)
    });

    it('GET one  cart', (done) => {
        const item = {
            "cartId": "1",
            "items": [
                {
                    "item": "1",
                    "count": 1
                },
                {
                    "item": "2",
                    "count": 1
                },
                {
                    "item": "3",
                    "count": 1
                }
            ]
        };
        request
            .get('/cart/1')
            .expect(200)
            .expect((res) => {
                res.body.cartId.should.equal(item.cartId);
            })
            .end(done)
    });

    it('DELETE one cart', (done)=> {
        request
            .delete('/cart/5')
            .expect(204)
            .end(done);
    });

    it('POST insert cart should return a cart', (done) => {
        const item = {
            cartId: '5',
            items:['apple','aaaa']
        };
        request
            .post('/cart')
            .send(item)
            .expect(201)
            .expect((res) => {
                Item.find(item, (err, doc) => {
                    res.body.should.equal(doc);
                });
            })
            .end(done)
    });

    it('PUT one cart', (done)=> {
        const item = {
            id: '3',
            items:[{item:'hhhh',count:2}]
        };
        request
            .put('/cart/3')
            .send(item)
            .expect(204)
            .end(done);
    })

});
