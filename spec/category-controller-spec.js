const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
require('should');

const Category = require('../models/category');

describe('CategoryController', ()=> {
    it('GET all categorys', (done) => {
        request
            .get('/category')
            .expect(200)
            .end(done)
    });

    it('GET one  category', (done) => {
        const item = {
            "_id": "588882cff6b06e57c8de6aae",
            "categoryId": "1",
            "categoryName": "fruit",
            "__v": 0
        };
        request
            .get('/category/1')
            .expect(200)
            .expect((res) => {
                res.body._id.should.equal(item._id);
            })
            .end(done)
    });


    it('POST insert category should return a category', (done) => {
        const category = {
            categoryId: '2',
            categoryName: 'fruit',
            cartId: '1'
        };
        request
            .post('/category')
            .send(category)
            .expect(201)
            .expect((res) => {
                Category.find(category, (err, doc) => {
                    res.body.should.equal(doc);
                });
            })
            .end(done)
    });

    it('DELETE one category', (done)=> {
        request
            .delete('/category/6')
            .expect(204)
            .end(done);
    });

    it('PUT one category', (done)=> {
        const item = {
            categoryId: '100',
            categoryName: '8888',
            cartId: '1'
        };
        request
            .put('/category/100')
            .send(item)
            .expect(204)
            .end(done);
    })

});
