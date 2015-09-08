'use strict';

describe('Directive: longballs', function () {

  // load the directive's module
  beforeEach(module('longballDataVizApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<longballs></longballs>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the longballs directive');
  }));
});
