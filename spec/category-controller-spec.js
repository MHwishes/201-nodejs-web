const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
const refresh = require('../tools/refreshMongo');

require('should');

const Category = require('../models/category');

describe('CategoryController', ()=> {
    beforeEach(()=> {
        refresh();
    });

    it('GET all categorys', (done) => {
        request
            .get('/category')
            .expect(200)
            .end(done)
    });

    it('GET one  category', (done) => {
        const item = {
            "_id": "587f0f2586653d19297d40c8",
            "name": "文具",
            "__v": 0
        };
        request
            .get('/category/587f0f2586653d19297d40c8')
            .expect(200)
            .expect((res) => {
                res.body._id.should.equal(item._id);
            })
            .end(done)
    });


    it('POST insert category should return a category', (done) => {
        const category = {
            name:"bbbb"
        };
        request
            .post('/category')
            .send(category)
            .expect(201)
            .end(done)
    });

    it('DELETE one category', (done)=> {
        request
            .delete('/category/587f0f2586653d19297d40c9')
            .expect(204)
            .end(done);
    });

    it('PUT one category', (done)=> {
        const item = {
            name:"张三"
        };
        request
            .put('/category/587f0f2586653d19297d40c8')
            .send(item)
            .expect(204)
            .end(done);
    })

});
