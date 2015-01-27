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
          feeds: function(feedsResource){
            return feedsResource.query().$promise;
          }
        },
      });

    $urlRouterProvider
      .otherwise('/network');
  }
}).call(this);