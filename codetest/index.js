(function() {
    
    loadUserData(4);

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


