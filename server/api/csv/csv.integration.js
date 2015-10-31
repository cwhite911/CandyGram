'use strict';

var app = require('../..');
var request = require('supertest');

var newCsv;

describe('Csv API:', function() {

  describe('GET /api/csv', function() {
    var csvs;

    beforeEach(function(done) {
      request(app)
        .get('/api/csv')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          csvs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      csvs.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/csv', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/csv')
        .send({
          name: 'New Csv',
          info: 'This is the brand new csv!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newCsv = res.body;
          done();
        });
    });

    it('should respond with the newly created csv', function() {
      newCsv.name.should.equal('New Csv');
      newCsv.info.should.equal('This is the brand new csv!!!');
    });

  });

  describe('GET /api/csv/:id', function() {
    var csv;

    beforeEach(function(done) {
      request(app)
        .get('/api/csv/' + newCsv._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          csv = res.body;
          done();
        });
    });

    afterEach(function() {
      csv = {};
    });

    it('should respond with the requested csv', function() {
      csv.name.should.equal('New Csv');
      csv.info.should.equal('This is the brand new csv!!!');
    });

  });

  describe('PUT /api/csv/:id', function() {
    var updatedCsv

    beforeEach(function(done) {
      request(app)
        .put('/api/csv/' + newCsv._id)
        .send({
          name: 'Updated Csv',
          info: 'This is the updated csv!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCsv = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCsv = {};
    });

    it('should respond with the updated csv', function() {
      updatedCsv.name.should.equal('Updated Csv');
      updatedCsv.info.should.equal('This is the updated csv!!!');
    });

  });

  describe('DELETE /api/csv/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/csv/' + newCsv._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when csv does not exist', function(done) {
      request(app)
        .delete('/api/csv/' + newCsv._id)
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
