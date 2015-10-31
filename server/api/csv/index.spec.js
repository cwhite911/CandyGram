'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var csvCtrlStub = {
  index: 'csvCtrl.index',
  show: 'csvCtrl.show',
  create: 'csvCtrl.create',
  update: 'csvCtrl.update',
  destroy: 'csvCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var csvIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './csv.controller': csvCtrlStub
});

describe('Csv API Router:', function() {

  it('should return an express router instance', function() {
    csvIndex.should.equal(routerStub);
  });

  describe('GET /api/csv', function() {

    it('should route to csv.controller.index', function() {
      routerStub.get
        .withArgs('/', 'csvCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/csv/:id', function() {

    it('should route to csv.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'csvCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/csv', function() {

    it('should route to csv.controller.create', function() {
      routerStub.post
        .withArgs('/', 'csvCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/csv/:id', function() {

    it('should route to csv.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'csvCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/csv/:id', function() {

    it('should route to csv.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'csvCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/csv/:id', function() {

    it('should route to csv.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'csvCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
