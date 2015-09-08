'use strict';

describe('Service: ndxFactory', function () {

  // load the service's module
  beforeEach(module('longballDataVizApp'));

  // instantiate service
  var ndxFactory;
  beforeEach(inject(function (_ndxFactory_) {
    ndxFactory = _ndxFactory_;
  }));

  it('should do something', function () {
    expect(!!ndxFactory).toBe(true);
  });

});
