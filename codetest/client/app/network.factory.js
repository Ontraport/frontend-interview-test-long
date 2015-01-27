angular.module('network.factory', ['ngResource'])
  
  .factory('feedsResource', ['$resource', function($resource){
    return $resource('/feeds',{},{
      query: {
        method: 'GET'
      }
    }); 
  }]);