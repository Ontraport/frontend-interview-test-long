(function(){
  angular.module('network.ctrl', ['network.factory'])

    .controller('networkCtrl', networkCtrl);
    networkCtrl.$inject = ['feeds', 'feedsUpdate'];
    function networkCtrl(feeds, feedsUpdate){
      var model = this;
      model.posts = feeds.posts;
      model.users = feeds.users;
      model.nextId = feeds.nextId;
      model.postComment = function(e, p){
        if(e.which === 13){
          if(e.srcElement.value.length !== 0){
            var commentObject = {
              "id": model.nextId,
              "postId": p.id,
              "userId": model.currentUser().id,
              "date": "",
              "content": e.srcElement.value
            };
            p.comments.push(commentObject);
            feedsUpdate.put({}, model.posts, function(res){
              console.log(res);
            });
            model.nextId++;
            e.srcElement.value = '';  
          }
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
    }
}).call(this);