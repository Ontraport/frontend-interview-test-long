(function() {
  var app = angular.module('posts', []);

  app.directive('posts', function() {
    return {    
      restrict: 'E',
      templateUrl: 'posts.html',
      controller: function($scope, $http, $localStorage) {


        if ($localStorage.posts.length == 0) {
        $http.get('data/posts.json').success(function(data){
            $scope.dataPlug.posts = data;
        })
        .error(function(status) {
          console.log("Error: " + status);
        });
        }

        $scope.postUpdate = function() {
          $scope.dataPlug.posts.push(
            {
              id: $scope.dataPlug.posts.length+1,
              userId: $scope.loggedKey,
              date: "",
              content: $scope.newUpdate,
              comments: []
            }
          );
          $scope.newUpdate = "";
          $scope.hideForm();
              console.log($localStorage);
        };


      },
      controllerAs: 'postCtrl'
    };
  });

})();