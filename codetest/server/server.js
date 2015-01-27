var fs = require('fs');
var express = require('express');
var app = express();
var ejs = require('ejs');

app.use(express.static(__dirname + '/../client'));
app.engine('html', ejs.renderFile);
app.set('views', __dirname + '/../client');

app.get('/', function(req, res){
  res.render('index.html');
  res.end();
});

app.get('/feeds', function(req, res){
  stream(req, res);
  console.log('feeds request sent');
});


var port = 4000;

app.listen(port);
console.log('listening ' + port);






  
function stream(req, res){
  var responseObject = {};
  fs.readFile('../data/posts.json', function(err, data){
    if(err){
      throw err;
    }else{
      responseObject.posts = JSON.parse(data);
      var largestId = 0;
      for(var i = 0; i < responseObject.posts.length; i++){
        var post = responseObject.posts[i];
        if(post.comments.length > 0){
          var lastIndex = post.comments.length - 1;
          var lastPost = post.comments[lastIndex];
          if(lastPost.id > largestId){
            largestId = lastPost.id;
          }
        }else if(post.id > largestId){
          largestId = post.id; 
        }
      }
      responseObject.nextId = ++largestId;
      fs.readFile('../data/users.json', function(err, data){
        if(err){
          throw err;
        }else{
          responseObject.users = JSON.parse(data);
          var responseString = JSON.stringify(responseObject);
          res.end(responseString);
        }
      });
    }
  });
}

