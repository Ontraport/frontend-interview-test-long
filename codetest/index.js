(function() {
    
    loadUserData(4);
    loadPostsData();

})();

function loadUserData(userId) {
    
    var getUserRequest = new XMLHttpRequest();
    
    getUserRequest
    .open('GET', 'https://raw.githubusercontent.com/jvald8/frontend-interview-test-long/master/codetest/data/users.json', true);
    
    getUserRequest.onload = function() {
      if (getUserRequest.status >= 200 && getUserRequest.status < 400) {

        var data = JSON.parse(getUserRequest.responseText);
        
        localStorage.users = getUserRequest.responseText;
        
        var user = data[userId];
        
        var promise = new Promise(function(resolve, reject) {
           if(user !== undefined) {
            resolve(user);
           } else {
            reject(Error("promise didn't work for some reason"));
           }
        });
        
        promise.then(function(user) {
          
            var pageEl = document.getElementById('page'),
            userEl = document.createElement('div'),
            userImage = document.createElement('img'),
            userName = document.createElement('div');
            
            userEl.setAttribute("class", "user");
            
            pageEl.appendChild(userEl);
            
            userImage.src = user.pic;
            userName.innerHTML = user.username;
            
            userEl.insertBefore(userName, userEl.firstChild);
            userEl.insertBefore(userImage, userEl.firstChild);
            
        }, function(err) {
            console.log(err);
        });
        
      } else {
        console.log('error loading XMLHttpgetUserRequest');
      }
    };

    getUserRequest.onerror = function() {
        console.log('connection error');
    };

    getUserRequest.send();
}

function loadPostsData() {

    var getPostsRequest = new XMLHttpRequest();
    
    getPostsRequest
    .open('GET', 'https://raw.githubusercontent.com/jvald8/frontend-interview-test-long/master/codetest/data/posts.json', true);
    
    getPostsRequest.onload = function() {
      if (getPostsRequest.status >= 200 && getPostsRequest.status < 400) {

        var data = JSON.parse(getPostsRequest.responseText);
        
        localStorage.posts = getPostsRequest.responseText;
        
        var promise = new Promise(function(resolve, reject) {
           if(data !== undefined) {
            resolve(data);
           } else {
            reject(Error("promise didn't work for some reason"));
           }
        });
        
        var pageEl = document.getElementById('page'),
        postEl = document.createElement('div');
        
        postEl.setAttribute("id", "posts");
        postEl.setAttribute("class", "posts");
        
        pageEl.appendChild(postEl);
        
        // only works es6
        promise.then(function(data) {
            for(var i = data.length - 1;i >= 0 ; i--) {

                var postEl = document.getElementById("posts"),
                postDiv = document.createElement('div'),
                postImage = document.createElement('img');
                
                var users = JSON.parse(localStorage.users);
                
                for(var p = 0; p < users.length; p++) {
                    if(users[p].id === data[i].userId) {
                        postImage.src = users[p].pic;
                        console.log(postImage);
                    }
                }
                
                postDiv.innerHTML = data[i].content;
                
                postEl.insertBefore(postDiv, postEl.firstChild).insertBefore(postImage, postDiv.firstChild);
                
                if(data[i].comments.length > 0) {
                    for(var j = 0; j < data[i].comments.length; j++) {
                        
                        var commentDiv = document.createElement('div'),
                        commentUserImage = document.createElement('img');
                        
                        commentDiv.innerHTML = data[i].comments[j].content;
                        
                        postDiv
                        .insertBefore(commentDiv, postDiv.secondChild);
                        
                        for(var h = 0; h < users.length; h++) {
                            if(users[h].id === data[i].comments[j].userId) {
                                commentUserImage.src = users[h].pic;
                            }
                        }
                        
                        commentDiv
                        .insertBefore(commentUserImage, commentDiv.firstChild);
                    }
                }
            } 
        }, function(err) {
            console.log(err);
        });
      } else {
        console.log('error loading XMLHttpgetUserRequest');
      }
    };

    getPostsRequest.onerror = function() {
        console.log('connection error');
    };

    getPostsRequest.send();
}

function loadSubmitButton() {
    var header = document.getElementById('header');
    
    var postButton = document.createElement('div'),
    postLink = document.createElement('a');
    
    postLink.setAttribute('href', '#openModal');
    
    postLink.innerHTML = 'Post an Update';
    postButton.setAttribute("class", "postButton");
    postButton.appendChild(postLink);

    header.appendChild(postButton);
    
    var modal = document.createElement('div'),
    innerModal = document.createElement('div'),
    modal_input = document.createElement('input'),
    modal_exit = document.createElement('a');
    
    modal_exit.innerHTML = 'X';
    modal_exit.setAttribute("href", "#close");
    
    var attributes = {'id':'openModal', 'class':'modalDialog'};
    
    for(var key in attributes) {
        modal.setAttribute(key, attributes[key]);
    }
    
    innerModal.appendChild(modal_input);
    innerModal.appendChild(modal_exit);
    
    modal.appendChild(innerModal);
    
    /*postButton.onclick = function(e) {
        e.preventDefault();

        modal.setAttribute('class', 'visible');
        modal.innerHTML = "I'm here!";
        
        this.appendChild(modal);
        
        modal_exit.onclick = function() {
            e.preventDefault();

            modal.setAttribute('class', 'invisible');
            modal.innerHTML = "";
        };
    };*/
    
    // do attach event here
    /*var callback = function() {
        modal.setAttribute('class', 'visible');
        modal.innerHTML = "I'm here!";
    };*/
    
    //postButton.addEventListener('click', callback, false);
}
