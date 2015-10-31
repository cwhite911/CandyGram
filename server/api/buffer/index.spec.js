'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var bufferCtrlStub = {
  index: 'bufferCtrl.index',
  show: 'bufferCtrl.show',
  create: 'bufferCtrl.create',
  update: 'bufferCtrl.update',
  destroy: 'bufferCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var bufferIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './buffer.controller': bufferCtrlStub
});

describe('Buffer API Router:', function() {

  it('should return an express router instance', function() {
    bufferIndex.should.equal(routerStub);
  });

  describe('GET /api/buffer', function() {

    it('should route to buffer.controller.index', function() {
      routerStub.get
        .withArgs('/', 'bufferCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/buffer/:id', function() {

    it('should route to buffer.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'bufferCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/buffer', function() {

    it('should route to buffer.controller.create', function() {
      routerStub.post
        .withArgs('/', 'bufferCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/buffer/:id', function() {

    it('should route to buffer.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'bufferCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/buffer/:id', function() {

    it('should route to buffer.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'bufferCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/buffer/:id', function() {

    it('should route to buffer.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'bufferCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
