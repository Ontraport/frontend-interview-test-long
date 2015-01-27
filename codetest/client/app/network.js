(function(){

    angular.module('networkApp', 
      [
        'ngResource',
        'ui.router',
        'network.factory',
        'network.config',
        'network.ctrl'
       // 'navbarModule', 
       // 'postsModule', 
       // 'dashboardModule'
      ]);


}).call(this);
  

  // var network = {

  //   addCommentToPost : function(){},
    
  //   addUserDashboard : function(){},
    
  //   createNewPost : function(){},
    
  //   currentUser : function(){
  //     //would normally find out userID from server
  //     //hard-code userID 1
  //     return 1;      
  //   },
    
  //   getAllPosts : function(){
  //     if(!Box.isset('posts')){
  //       $.getJSON('data/posts.json')
  //        .done(function(data){
  //          Box.store('posts', data);   
  //       }).fail(function(undefined, status, err){
  //         console.log('failed to load ' + err);
  //       });
  //     }
  //   },

  //   getAllUsers: function(){},

  //   getExistingPosts: function(){},

  //   getPostComments: function(){},
  // };

