'use strict';

(function() {
    initialize(4);
    
    // open modal
    document.getElementById('submit').onclick = function(e) {
        e.preventDefault();
        
        document.getElementById('modal').classList.add('active');
    };

    // close modal
    document.getElementById('modal-close').onclick = function(e) {
        e.preventDefault();
        
        closeModal();
    };
    
    function closeModal() {
        document.getElementById('modal').classList.remove('active');
    }
    
    // submit post
    document.getElementById('post-update').onsubmit = function(e) {
        e.preventDefault();
        
        var posts = JSON.parse(localStorage.posts) || [];
        
        var newPost = {
            "id": posts.length + 1,
            "userId": 5,
            "date": "",
            "content": document.getElementById('post-value').value,
            "comments": []
        
        };
        
        posts.push(newPost);
        localStorage.posts = JSON.stringify(posts);
        
        document.getElementById('post-value').value = '';
        document.getElementById('posts').remove();
        
        loadPostsData();
        closeModal();
    };
})();

function initialize(userId) {
    var getUserRequest = new XMLHttpRequest();
    
    getUserRequest
    .open('GET', 'https://raw.githubusercontent.com/jvald8/frontend-interview-test-long/master/codetest/data/users.json', true);
    
    getUserRequest.onload = function() {
      if (getUserRequest.status >= 200 && getUserRequest.status < 400) {

        var data = getUserRequest.responseText;
        
        if (!localStorage.users) {
            localStorage.users = data;
        }
        
        data = JSON.parse(localStorage.users);
        
        var user = data[userId];
        
        var promise = new Promise(function(resolve, reject) {
           if (user !== undefined) {
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
            
            document.getElementById('update_image').src = user.pic;
            userEl.insertBefore(userName, userEl.firstChild);
            userEl.insertBefore(userImage, userEl.firstChild);
            
            loadPostsData();
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

        var data = getPostsRequest.responseText;
        
        if (!localStorage.posts) {
            localStorage.posts = data;
        }
        
        data = JSON.parse(localStorage.posts);
        
        var promise = new Promise(function(resolve, reject) {
           if (data !== undefined) {
            resolve(data);
           } else {
            reject(Error("promise didn't work for some reason"));
           }
        });
        
        var pageEl = document.getElementById('page'),
            postEl = document.createElement('div'),
            postText = document.createElement('h2');
        
        postEl.setAttribute("id", "posts");
        postEl.setAttribute("class", "posts");
        postText.innerHTML = "Updates";
        pageEl.appendChild(postEl);
        
        // only works es6
        promise.then(function(data) {
            for (var i = data.length - 1;i >= 0 ; i--) {

                let postEl = document.getElementById('posts'),
                    postDiv = document.createElement('div'),
                    postImage = document.createElement('img'),
                    postName = document.createElement('h4'),
                    users = JSON.parse(localStorage.users);
                    
                postDiv.classList.add(i + 1);
                
                for (var p = 0; p < users.length; p++) {
                    if (users[p].id === data[i].userId) {
                        postImage.src = users[p].pic;
                        postName.innerHTML = users[p].username;
                    }
                }
                
                postDiv.innerHTML = data[i].content;
                
                postEl
                .insertBefore(postDiv, postEl.firstChild);
                
                postDiv
                .insertBefore(postName, postDiv.firstChild);
                
                postDiv
                .insertBefore(postImage, postDiv.firstChild);
                
                if (data[i].comments.length > 0) {
                    for (var j = 0; j < data[i].comments.length; j++) {
                        
                        var commentDiv = document.createElement('div'),
                            commentUserImage = document.createElement('img'),
                            commentName = document.createElement('h4');
                        
                        commentDiv.innerHTML = data[i].comments[j].content;
                        
                        postDiv
                        .insertBefore(commentDiv, postDiv.secondChild);
                        
                        for (var h = 0; h < users.length; h++) {
                            if (users[h].id === data[i].comments[j].userId) {
                                commentUserImage.src = users[h].pic;
                                commentName.innerHTML = users[h].username;
                            }
                        }
                        
                        commentDiv
                        .insertBefore(commentName, commentDiv.firstChild);
                        
                        commentDiv
                        .insertBefore(commentUserImage, commentDiv.firstChild);
                    }
                }
                
                let commentInputDiv = document.createElement('div'),
                    commentForm = document.createElement('form'),
                    commentInput = document.createElement('input');
                
                commentInput.placeholder = "post a comment";
                commentForm.appendChild(commentInput);
                commentInputDiv.appendChild(commentForm);
                postDiv.appendChild(commentInputDiv);
                
                commentForm.onsubmit = function(e) {
                    e.preventDefault();
                    
                    addComment(postDiv, commentInputDiv, commentInput);
                };
                
                postEl.insertBefore(postText, postEl.firstChild);
                
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

function addComment(postDiv, commentDiv, commentInput) {
    var newCommentDiv = document.createElement('div'),
        newCommentName = document.createElement('h4'),
        newCommentUserImage = document.createElement('img');
        
    var postId = parseInt(postDiv.classList[0] - 1),
        commentObject = { "id": 13, "postId": postId + 1, "userId": 5, "date": "", "content": commentInput.value },
        posts = JSON.parse(localStorage.posts);
    
    newCommentDiv.innerHTML = commentInput.value;
    newCommentUserImage.src = JSON.parse(localStorage.users)[4].pic;
    newCommentName.innerHTML = JSON.parse(localStorage.users)[4].username;
    
    newCommentDiv
    .insertBefore(newCommentName, newCommentDiv.firstChild);
    
    newCommentDiv
    .insertBefore(newCommentUserImage, newCommentDiv.firstChild);
    
    postDiv
    .insertBefore(newCommentDiv, postDiv.lastChild);

    // add to localstorage
    posts[postId].comments.push(commentObject);
    
    localStorage.setItem('posts', JSON.stringify(posts));
    
    commentInput.value = '';
}
