'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var geojsonCtrlStub = {
  index: 'geojsonCtrl.index',
  show: 'geojsonCtrl.show',
  create: 'geojsonCtrl.create',
  update: 'geojsonCtrl.update',
  destroy: 'geojsonCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var geojsonIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './geojson.controller': geojsonCtrlStub
});

describe('Geojson API Router:', function() {

  it('should return an express router instance', function() {
    geojsonIndex.should.equal(routerStub);
  });

  describe('GET /api/geojson', function() {

    it('should route to geojson.controller.index', function() {
      routerStub.get
        .withArgs('/', 'geojsonCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/geojson/:id', function() {

    it('should route to geojson.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'geojsonCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/geojson', function() {

    it('should route to geojson.controller.create', function() {
      routerStub.post
        .withArgs('/', 'geojsonCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/geojson/:id', function() {

    it('should route to geojson.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'geojsonCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/geojson/:id', function() {

    it('should route to geojson.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'geojsonCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/geojson/:id', function() {

    it('should route to geojson.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'geojsonCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
