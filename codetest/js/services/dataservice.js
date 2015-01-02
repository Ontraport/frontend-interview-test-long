myApp.factory('dataService', function($http, $q) {
  var postDefer = $q.defer();
  var userDefer = $q.defer();
  var postData = []; 
  var userData = [];  
  var dataService = {};

  dataService.asyncPostData = function() {
    $http.get('data/posts.json').success(function(data) {
    postData = data;
    postDefer.resolve();
    });
    return postDefer.promise;
  };
  dataService.postData = function() { return postData; };

  dataService.asyncUserData = function() {
    $http.get('data/users.json').success(function(data) {
    userData = data;
    userDefer.resolve();
    });
    return userDefer.promise;
  }
  dataService.userData = function() { return userData; };

  return dataService;
});