const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
const refresh = require('./refresh-mongo');
require('should');

describe('CartController', ()=> {

  beforeEach(()=> {
    refresh();
  });

  it('GET all  Carts', (done) => {
    request
      .get('/cart')
      .expect(200)
      .end(done)
  });

  it('GET one  cart', (done) => {
    request
      .get('/cart/587f0f2586653d19297d40c6')
      .expect(200)
      .expect((res) => {
        res.body._id.should.equal('587f0f2586653d19297d40c6');
      })
      .end(done)
  });

  it('POST insert cart should return a cart', (done) => {
    const cart = {
      userId: '10',
      items: [
        {
          count: 4,
          item: '587f0f2586653d19297d40c2'
        }
      ]
    };
    request
      .post('/cart')
      .send(cart)
      .expect(201)
      .end(done)
  });

  it('PUT one cart', (done)=> {
    const item = {
      userId: '15',
      items: [
        {
          count: 9,
          item: '587f0f2586653d19297d40c2'
        }
      ]
    };
    request
      .put('/cart/587f0f2586653d19297d40c6')
      .send(item)
      .expect(204)
      .end(done);
  });

  it('DELETE one cart', (done)=> {
    request
      .delete('/cart/587f0f2586653d19297d40c6')
      .expect(204)
      .end(done);
  });


});
