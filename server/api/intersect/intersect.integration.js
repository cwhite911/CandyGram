'use strict';

var app = require('../..');
var request = require('supertest');

var newIntersect;

describe('Intersect API:', function() {

  describe('GET /api/intersect', function() {
    var intersects;

    beforeEach(function(done) {
      request(app)
        .get('/api/intersect')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          intersects = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      intersects.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/intersect', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/intersect')
        .send({
          name: 'New Intersect',
          info: 'This is the brand new intersect!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newIntersect = res.body;
          done();
        });
    });

    it('should respond with the newly created intersect', function() {
      newIntersect.name.should.equal('New Intersect');
      newIntersect.info.should.equal('This is the brand new intersect!!!');
    });

  });

  describe('GET /api/intersect/:id', function() {
    var intersect;

    beforeEach(function(done) {
      request(app)
        .get('/api/intersect/' + newIntersect._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          intersect = res.body;
          done();
        });
    });

    afterEach(function() {
      intersect = {};
    });

    it('should respond with the requested intersect', function() {
      intersect.name.should.equal('New Intersect');
      intersect.info.should.equal('This is the brand new intersect!!!');
    });

  });

  describe('PUT /api/intersect/:id', function() {
    var updatedIntersect

    beforeEach(function(done) {
      request(app)
        .put('/api/intersect/' + newIntersect._id)
        .send({
          name: 'Updated Intersect',
          info: 'This is the updated intersect!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedIntersect = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedIntersect = {};
    });

    it('should respond with the updated intersect', function() {
      updatedIntersect.name.should.equal('Updated Intersect');
      updatedIntersect.info.should.equal('This is the updated intersect!!!');
    });

  });

  describe('DELETE /api/intersect/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/intersect/' + newIntersect._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when intersect does not exist', function(done) {
      request(app)
        .delete('/api/intersect/' + newIntersect._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
