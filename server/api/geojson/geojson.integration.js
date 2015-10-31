'use strict';

var app = require('../..');
var request = require('supertest');

var newGeojson;

describe('Geojson API:', function() {

  describe('GET /api/geojson', function() {
    var geojsons;

    beforeEach(function(done) {
      request(app)
        .get('/api/geojson')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          geojsons = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      geojsons.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/geojson', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/geojson')
        .send({
          name: 'New Geojson',
          info: 'This is the brand new geojson!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newGeojson = res.body;
          done();
        });
    });

    it('should respond with the newly created geojson', function() {
      newGeojson.name.should.equal('New Geojson');
      newGeojson.info.should.equal('This is the brand new geojson!!!');
    });

  });

  describe('GET /api/geojson/:id', function() {
    var geojson;

    beforeEach(function(done) {
      request(app)
        .get('/api/geojson/' + newGeojson._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          geojson = res.body;
          done();
        });
    });

    afterEach(function() {
      geojson = {};
    });

    it('should respond with the requested geojson', function() {
      geojson.name.should.equal('New Geojson');
      geojson.info.should.equal('This is the brand new geojson!!!');
    });

  });

  describe('PUT /api/geojson/:id', function() {
    var updatedGeojson

    beforeEach(function(done) {
      request(app)
        .put('/api/geojson/' + newGeojson._id)
        .send({
          name: 'Updated Geojson',
          info: 'This is the updated geojson!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedGeojson = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedGeojson = {};
    });

    it('should respond with the updated geojson', function() {
      updatedGeojson.name.should.equal('Updated Geojson');
      updatedGeojson.info.should.equal('This is the updated geojson!!!');
    });

  });

  describe('DELETE /api/geojson/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/geojson/' + newGeojson._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when geojson does not exist', function(done) {
      request(app)
        .delete('/api/geojson/' + newGeojson._id)
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
