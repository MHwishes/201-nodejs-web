const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
const refresh = require('../tools/refresh-mongo');
require('should');

describe('ItemController', ()=> {
  beforeEach(()=> {
    refresh();
  });

  it('GET all  Item', (done) => {
    request
      .get('/item')
      .expect(200)
      .end(done)
  });

  it('GET one  Item', (done) => {
    const item = {
      "_id": "587f0f2586653d19297d40c2",
      "name": "钢笔",
      "price": 12,
      "category": "587f0f2586653d19297d40c8",
      "__v": 0
    };

    request
      .get('/item/587f0f2586653d19297d40c2')
      .expect(200)
      .expect((res) => {
        res.body._id.should.equal(item._id);
      })
      .end(done)
  });

  it('POST insertItem should return a Item', (done) => {
    const item = {
      name: 'mahong',
      price: 100,
      category: '587f0f2586653d19297d40c8'
    };
    request
      .post('/item')
      .send(item)
      .expect(201)
      .end(done)
  });

  it('DELETE one Item', (done)=> {
    request
      .delete('/item/587f0f2586653d19297d40c2')
      .expect(204)
      .end(done);
  });


  it('PUT one Item', (done)=> {
    const item = {
      name: 'aaaa',
      price: 34,
      category: '587f0f2586653d19297d40c9'
    };
    request
      .put('/item/587f0f2586653d19297d40c3')
      .send(item)
      .expect(204)
      .end(done);
  })

});
