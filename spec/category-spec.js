require('should');
const supertest = require('supertest');
const express = require('express');
const app = require('../app');
const request = supertest(app);


const Category = require('../model/category');




describe('CategoryController', ()=> {


  it('GET /categories should return all category', (done) => {
    request
      .get('/categories')
      .expect(200)
      .expect((res) => {
        res.body.totalCount.should.equal(2);
      })
      .end(done);
  });

  it('GET /categories/:categoryId', (done) => {
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
      name: "bbbb"
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
      name: "张三"
    };
    request
      .put('/category/587f0f2586653d19297d40c8')
      .send(item)
      .expect(204)
      .end(done);
  })

});
