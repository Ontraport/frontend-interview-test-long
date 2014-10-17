(function() {
  var app = angular.module('posts', []);

  app.directive('posts', function() {
    return {
      restrict: 'E',
      templateUrl: 'posts.html',
      controller: function($scope, $http) {

        $http.get('data/posts.json').success(function(data){
            $scope.dataPlug.posts = data;
            for (var key in $scope.dataPlug.posts) {
              var obj = $scope.dataPlug.posts[key];


              for (var key2 in $scope.dataPlug.users) {
                var obj2 = $scope.dataPlug.users[key2];

                if (obj2.id == obj.userId) {
                  var picAdd = (obj2.pic);
                }
            }

            $scope.dataPlug.posts[key].posterPic = picAdd;
        };   
        })
        .error(function(status) {
          console.log("Error: " + status);
        }); 


       


      },
      controllerAs: 'postCtrl'
    };
  });

  })();