(function() {
  var app = angular.module('users', []);

  app.directive('user', function() {
    return {
      restrict: 'E',
      templateUrl: 'users.html',
      controller: function($scope, $http) {

        $http.get('data/users.json').success(function(data){
            $scope.dataPlug.users = data;
        })
        .error(function(status) {
          console.log("Error: " + status);
        });

        var userIndex = {};
        for (var i = 0; i < $scope.dataPlug.users.length; i++) {
          userIndex[$scope.dataPlug.users[i].id] = $scope.dataPlug.users[i];
        }; 

        $scope.userIndex = userIndex;

        $scope.loggedKey = 5;
        console.log($scope.userIndex[$scope.loggedKey]);

      },
      controllerAs: 'userCtrl'
    };
  });

  })();