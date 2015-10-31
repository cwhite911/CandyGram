'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var intersectCtrlStub = {
  index: 'intersectCtrl.index',
  show: 'intersectCtrl.show',
  create: 'intersectCtrl.create',
  update: 'intersectCtrl.update',
  destroy: 'intersectCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var intersectIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './intersect.controller': intersectCtrlStub
});

describe('Intersect API Router:', function() {

  it('should return an express router instance', function() {
    intersectIndex.should.equal(routerStub);
  });

  describe('GET /api/intersect', function() {

    it('should route to intersect.controller.index', function() {
      routerStub.get
        .withArgs('/', 'intersectCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/intersect/:id', function() {

    it('should route to intersect.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'intersectCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/intersect', function() {

    it('should route to intersect.controller.create', function() {
      routerStub.post
        .withArgs('/', 'intersectCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/intersect/:id', function() {

    it('should route to intersect.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'intersectCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/intersect/:id', function() {

    it('should route to intersect.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'intersectCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/intersect/:id', function() {

    it('should route to intersect.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'intersectCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
