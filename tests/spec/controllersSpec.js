describe('Frontpage Controller', function(){
  
  var scope,ctrl,$httpBackend,fakeData;

  beforeEach(module('cchopControllers'));

  fakeData = 
  	{"lists":
  		[{"id":"category_one","name":"Category One"}],
    "offs":[
		{"id":"fakeID","title":"fake title","img":"/images/sample1.jpg","off":0,"price":22.99}],
	"slides": [
		{"id":"fakeID","subtitle":"fake subtitle","img":"/images/sample1.jpg"}],
	"offers":[
		{"id":"fakeID","title":"fake title","subtitle":"fake subtitle","img":"/images/sample1.jpg","off":0,"price":22.99}]
    };

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('data/frontpage.json').
        respond(fakeData);

    scope = $rootScope.$new();
    ctrl = $controller('FrontpageCtrl', {$scope: scope});
  }));

  it('Should load lists', function() {
  	$httpBackend.flush();
    expect(scope.lists.length).toBe(1);
  });

  it('Should load offs', function() {
  	$httpBackend.flush();
    expect(scope.offs.length).toBe(1);
  });

  it('Should load offers', function() {
  	$httpBackend.flush();
    expect(scope.offers.length).toBe(1);
  });

  it('Should load slides', function() {
  	$httpBackend.flush();
    expect(scope.slides.length).toBe(1);
  });

  it('Should have goToItem property as a function', function() {
  	expect(typeof scope.goToItem).toEqual('function');
  });


});
