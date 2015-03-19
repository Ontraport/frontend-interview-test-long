
var loggedInUser = 5;

$(document).ready(function() {
  var users = {};
  var posts = [];

  // Load Users and Posts
  $.ajax({
    url: "data/users.json",
    async: false,
    dataType: 'json',
    success: function(data) {
      users = data.slice(0);
      for (var i = 0, len = data.length; i < len; i++) {
        users[data[i].id] = data[i];
      }
    }
  });

  $.ajax({
    url: "data/posts.json",
    async: false,
    dataType: 'json',
    success: function(data) {
      posts = data.slice(0);
    }
  });

  $('#profile-nav-img').append('<img src="' + users[loggedInUser].pic + '" class="nav-img sm-profile-image">');
  $('#profile-panel-img').append('<img src="' + users[loggedInUser].pic + '" class="lg-profile-image">');
  $('#profile-panel-name').append("_" + users[loggedInUser].username);

  // Append Posts and comments
  for (var i = 0; i < posts.length; i++) {
    var user = users[posts[i].userId];
    var commentPostId = 'comment-panel-' + posts[i].id;
    var html = [];

    html.push(
    '<div class="row">',
      '<div class="col-sm-12">',
        '<img src="' + user.pic + '" class="lg-profile-image post-user-img">',
        '<div class="post-user-name">' + user.username + '</div>',
        '<div class="post-user-comment">' + posts[i].content + '</div>',
      '</div>',
    '</div>');
    
    html.push(
      '<div class="row">',
        '<div class="col-sm-11 col-offset-1 pull-right">',
          '<div class="panel panel-default comment-panel" id="' + commentPostId + '">',
            '<div class="panel-body">');

    for (var j = 0; j < posts[i].comments.length; j++) {
      var comments = posts[i].comments;
      var user = users[comments[j].userId];

      html.push(
              '<img src="' + user.pic + '" class="sm-profile-image post-user-img">',
              '<div class="post-user-name">' + user.username + '</div>',
              '<div class="post-user-comment">' + comments[j].content + '</div>',
              '<hr>'
              );
    }

    html.push(
              '<form method="post" action="#" id="cmtform">',
                '<input type="submit" style="position: absolute; left: -9999px"/>',
              '</form>',
              '<textarea rows="1" class="post-comment" form="cmtform" placeholder="post a comment"></textarea>',
            '</div>',  // end of panel-body
          '</div>',    // end of panel
        '</div>',      // end of col-sm-10
      '</div>'         // end of Row
    );

    $('#post-panel').append(html.join(''));
  }
});