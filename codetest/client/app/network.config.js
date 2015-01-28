(function(){
  angular.module('network.config', [])

  .config(['$urlRouterProvider','$stateProvider', config]);

  function config($urlRouterProvider, $stateProvider){
    $stateProvider
      .state('network', {
        url: '/network',
        templateUrl: 'app/network.html',
        controller: 'networkCtrl',
        controllerAs: 'Feed',
        resolve: {
          feedsResource: 'feedsResource',
          feedsUpdate: 'feedsUpdate', 
          feeds: function(feedsResource, feedsUpdate){
            if(Box.isset('stream')){
              var stream = JSON.parse(Box.fetch('stream'));
              return feedsUpdate.put({}, stream.posts, function(res){
                Box.empty();
              }).$promise.then(function(){
                return stream;
              });
            }else{
              return feedsResource.query().$promise;  
            }
          }
        },
      });

    $urlRouterProvider
      .otherwise('/network');
  }
}).call(this);