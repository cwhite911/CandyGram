'use strict';

var app = require('../..');
var request = require('supertest');

var newShapefile;

describe('Shapefile API:', function() {

  describe('GET /api/import/shapefile', function() {
    var shapefiles;

    beforeEach(function(done) {
      request(app)
        .get('/api/import/shapefile')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          shapefiles = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      shapefiles.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/import/shapefile', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/import/shapefile')
        .send({
          name: 'New Shapefile',
          info: 'This is the brand new shapefile!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newShapefile = res.body;
          done();
        });
    });

    it('should respond with the newly created shapefile', function() {
      newShapefile.name.should.equal('New Shapefile');
      newShapefile.info.should.equal('This is the brand new shapefile!!!');
    });

  });

  describe('GET /api/import/shapefile/:id', function() {
    var shapefile;

    beforeEach(function(done) {
      request(app)
        .get('/api/import/shapefile/' + newShapefile._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          shapefile = res.body;
          done();
        });
    });

    afterEach(function() {
      shapefile = {};
    });

    it('should respond with the requested shapefile', function() {
      shapefile.name.should.equal('New Shapefile');
      shapefile.info.should.equal('This is the brand new shapefile!!!');
    });

  });

  describe('PUT /api/import/shapefile/:id', function() {
    var updatedShapefile

    beforeEach(function(done) {
      request(app)
        .put('/api/import/shapefile/' + newShapefile._id)
        .send({
          name: 'Updated Shapefile',
          info: 'This is the updated shapefile!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedShapefile = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedShapefile = {};
    });

    it('should respond with the updated shapefile', function() {
      updatedShapefile.name.should.equal('Updated Shapefile');
      updatedShapefile.info.should.equal('This is the updated shapefile!!!');
    });

  });

  describe('DELETE /api/import/shapefile/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/import/shapefile/' + newShapefile._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when shapefile does not exist', function(done) {
      request(app)
        .delete('/api/import/shapefile/' + newShapefile._id)
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
