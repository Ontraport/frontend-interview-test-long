(function(){
  angular.module('network.ctrl', [])

    .controller('networkCtrl', networkCtrl);
    networkCtrl.$inject = ['feeds'];
    function networkCtrl(feeds){
      var model = this;
      model.feeds = feeds;
      model.posts = feeds.posts;
      model.users = feeds.users;
      model.nextId = feeds.nextId;
      model.postComment = function(e, p){
        if(e.which === 13){
          console.log(e);
          var commentObject = {
            "id": model.nextId,
            "postId": p.id,
            "userId": model.currentUser().id,
            "date": "",
            "content": e.srcElement.value
          };
          p.comments.push(commentObject);
          model.nextId++;
          e.srcElement.value = '';  
        }
      };
      model.currentUser = function(id){
        //would usually get this from the server after auth
        //hardcode 5 here
        var userID = (typeof id === 'undefined' ? 5 : id);
        var profile;
        for(var i = 0; i < model.users.length; i++){
          profile = model.users[i];
          if(profile.id === userID){
            return profile;
            
          }  
        }
      };
      console.log(model.posts);
      console.log(model.users);
      console.log(model.nextId);
    }
}).call(this);