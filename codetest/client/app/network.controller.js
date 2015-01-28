(function(){
  angular.module('network.ctrl', ['network.factory'])

    .controller('networkCtrl', networkCtrl);
    networkCtrl.$inject = ['feeds', 'feedsUpdate'];
    
    function networkCtrl(feeds, feedsUpdate){
      var model = this;
      model.showModal = false;
      model.posts = feeds.posts;
      model.users = feeds.users;
      model.nextId = feeds.nextId;
      console.log(model.posts);
      model.post = function(e, p, type){
        if(e.which === 13){
          if(e.srcElement.value.length !== 0){
            if(type === 'comment'){
              var commentObject = {
                "id": model.nextId,
                "postId": p.id,
                "userId": model.currentUser().id,
                "date": "",
                "content": e.srcElement.value
              };
              p.comments.push(commentObject);
            }else if(type === 'update'){
              var updateObject = {
                "comments": [],
                "content": e.srcElement.value,
                "date": "",
                "id": model.nextId,
                "userId": model.currentUser().id
              };
              model.posts.push(updateObject);
              model.showModal = false;
            }
            feedsUpdate.put({}, model.posts, function(res){
              Box.empty();
            }, function(err){  
                var stream = JSON.stringify({'posts': model.posts, 'users': model.users, 'nextId': model.nextId});
                Box.store('stream', stream);  
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
      model.toggleModal = function(bool){
        model.showModal = bool;
      };
    }
}).call(this);