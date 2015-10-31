'use strict';

var app = require('../..');
var request = require('supertest');

var newBuffer;

describe('Buffer API:', function() {

  describe('GET /api/buffer', function() {
    var buffers;

    beforeEach(function(done) {
      request(app)
        .get('/api/buffer')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          buffers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      buffers.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/buffer', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/buffer')
        .send({
          name: 'New Buffer',
          info: 'This is the brand new buffer!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newBuffer = res.body;
          done();
        });
    });

    it('should respond with the newly created buffer', function() {
      newBuffer.name.should.equal('New Buffer');
      newBuffer.info.should.equal('This is the brand new buffer!!!');
    });

  });

  describe('GET /api/buffer/:id', function() {
    var buffer;

    beforeEach(function(done) {
      request(app)
        .get('/api/buffer/' + newBuffer._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          buffer = res.body;
          done();
        });
    });

    afterEach(function() {
      buffer = {};
    });

    it('should respond with the requested buffer', function() {
      buffer.name.should.equal('New Buffer');
      buffer.info.should.equal('This is the brand new buffer!!!');
    });

  });

  describe('PUT /api/buffer/:id', function() {
    var updatedBuffer

    beforeEach(function(done) {
      request(app)
        .put('/api/buffer/' + newBuffer._id)
        .send({
          name: 'Updated Buffer',
          info: 'This is the updated buffer!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBuffer = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBuffer = {};
    });

    it('should respond with the updated buffer', function() {
      updatedBuffer.name.should.equal('Updated Buffer');
      updatedBuffer.info.should.equal('This is the updated buffer!!!');
    });

  });

  describe('DELETE /api/buffer/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/buffer/' + newBuffer._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when buffer does not exist', function(done) {
      request(app)
        .delete('/api/buffer/' + newBuffer._id)
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
