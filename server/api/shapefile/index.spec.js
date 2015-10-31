'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var shapefileCtrlStub = {
  index: 'shapefileCtrl.index',
  show: 'shapefileCtrl.show',
  create: 'shapefileCtrl.create',
  update: 'shapefileCtrl.update',
  destroy: 'shapefileCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var shapefileIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './shapefile.controller': shapefileCtrlStub
});

describe('Shapefile API Router:', function() {

  it('should return an express router instance', function() {
    shapefileIndex.should.equal(routerStub);
  });

  describe('GET /api/import/shapefile', function() {

    it('should route to shapefile.controller.index', function() {
      routerStub.get
        .withArgs('/', 'shapefileCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/import/shapefile/:id', function() {

    it('should route to shapefile.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'shapefileCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/import/shapefile', function() {

    it('should route to shapefile.controller.create', function() {
      routerStub.post
        .withArgs('/', 'shapefileCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/import/shapefile/:id', function() {

    it('should route to shapefile.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'shapefileCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/import/shapefile/:id', function() {

    it('should route to shapefile.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'shapefileCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/import/shapefile/:id', function() {

    it('should route to shapefile.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'shapefileCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
