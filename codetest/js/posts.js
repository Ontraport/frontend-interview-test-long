
// Load and display Posts/Comments
$(document).ready(function() {
  var users = {};
  var posts = [];
  var loggedInUser = 5;

  // Load Users and Posts
  $.ajax({
    url: "data/users.json",
    async: false,
    dataType: 'json',
    success: function(data) {
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

  // Store so we can access it in modal.js
  var post_number = $.jStorage.get("post_number") || posts.length+1;
  $.jStorage.set("logged_in_user", users[loggedInUser]);
  $.jStorage.set("post_number", post_number);  

  // Navbar and profile panel
  $('#profile-nav-img').append('<img src="' + users[loggedInUser].pic + '" class="nav-img sm-profile-image">');
  $('#profile-panel-img').append('<img src="' + users[loggedInUser].pic + '" class="lg-profile-image">');
  $('#profile-panel-name').append("_" + users[loggedInUser].username);

  var localPosts = $.jStorage.get("posts") || [];
  $.merge(posts, localPosts);
  
  // Posts and comments
  for (var i = 0; i < posts.length; i++) {
    var user = users[posts[i].userId];
    var html = [];

    // Post
    html.push(
    '<div class="row">',
      '<div class="col-sm-12">',
        '<img src="' + user.pic + '" class="lg-profile-image post-user-img">',
        '<div class="post-user-name">' + user.username + '</div>',
        '<div class="post-user-comment">' + posts[i].content + '</div>',
      '</div>',
    '</div>');
    
    // Comments
    var comments = posts[i].comments;
    var localComments = $.jStorage.get("comment-" + posts[i].id) || [];
    $.merge(comments, localComments);

    html.push(
    '<div class="row">',
      '<div class="col-sm-11 col-offset-1 pull-right">',
        '<div class="panel panel-default comment-panel">',
          '<div class="panel-body">');

    for (var j = 0; j < comments.length; j++) {
      var user = users[comments[j].userId];

      html.push(
            '<div class="comment">',
              '<img src="' + user.pic + '" class="sm-profile-image post-user-img">',
              '<div class="post-user-name">' + user.username + '</div>',
              '<div class="post-user-comment">' + comments[j].content + '</div>',
            '</div>',
            '<hr>');
    }

    html.push(
            '<form method="post" action="#" id="' + posts[i].id + '">',
              '<input type="submit" style="position: absolute; left: -9999px"/>',
            '</form>',
            '<textarea rows="1" class="post_comment" form="' + posts[i].id + '" placeholder="post a comment"></textarea>',
          '</div>',  // end of panel-body
        '</div>',    // end of panel
      '</div>',      // end of col-sm-11
    '</div>');       // end of Row

    $('#post-panel').append(html.join(''));
  }
});

// Handle submission of comments to a post
$(document).ready(function() {
  $('#post-panel').on('keydown', '.post_comment', function(event) {
    if (event.which == 13) {
      var html = [];
      var user = $.jStorage.get("logged_in_user"); 

      // Put it in local storage
      var comments = $.jStorage.get("comment-" + this.form.id) || [];
      comments.push({postId: this.form.id, userId: user.id, date: "", content: this.value});
      $.jStorage.set("comment-" + this.form.id, comments); 

      // Append it to the comments sections of post
      html.push(
        '<img src="' + user.pic + '" class="sm-profile-image post-user-img">',
        '<div class="post-user-name">' + user.username + '</div>',
        '<div class="post-user-comment">' + this.value + '</div>',
        '<hr>');

      // Insert new comment before form
      $('form#' + this.form.id).before(html.join(''));
      this.value = ''; // Clear value
      
      return false;
    }
  });
});

