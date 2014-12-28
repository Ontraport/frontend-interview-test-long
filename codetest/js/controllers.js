var postControllers = angular.module('postControllers', []);

postControllers.controller('getPostController', ['$scope', '$http', function($scope, $http){

  $http.get('data/posts.json').success(function(data) {
    $scope.postObj = data;
  });
  $http.get('data/users.json').success(function(data) {
   $scope.users = data;
  });
  

}]);//end of getPostController

postControllers.controller('postCommentController', ['$scope', function($scope){
  
$scope.outputVal = function($event){
	if($event.which == "13"){
		$event.preventDefault();
		if($scope.commentValue != null && $scope.commentValue != ""){
		console.log($scope.commentValue);
		$scope.commentValue = null;
		}
	}
}
}]);//end of postCommentController