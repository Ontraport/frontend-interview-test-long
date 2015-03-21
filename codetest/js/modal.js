// Load modal html
$(document).ready(function() {
  $( "#modal_html" ).load( "modal.html" );
});

// Auto focus textarea when modal is shown
$('#modal_html').on('shown.bs.modal', '.modal', function () {
  $('#modal_comment').focus();
});

// Center modal vertically on page
// http://www.abeautifulsite.net/vertically-centering-bootstrap-modals/
$(document).ready(function() {
  function reposition() {
    var modal = $(this),
    dialog = modal.find('.modal-dialog');
    modal.css('display', 'block');
    
    // Dividing by two centers the modal exactly, but dividing by three 
    // or four works better for larger screens.
    dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
  }
  // Reposition when a modal is shown
  $('#modal_html').on('show.bs.modal', '.modal',reposition);
  // Reposition when the window is resized
  $(window).on('resize', function() {
    $('.modal:visible').each(reposition);
  });
});

// Modal form submit
$(document).ready(function() {
  var user = $.jStorage.get("logged_in_user");

  $('#modal_html').on('keydown', '.modal_comment', function(event) {
    if (event.which == 13) {
      var html = [];

      var posts = $.jStorage.get("posts") || [];
      var post_number = $.jStorage.get("post_number");
      posts.push({id: post_number, userId: user.id, date: "", content: this.value, comments: []});
      $.jStorage.set("post_number", post_number+1);
      $.jStorage.set("posts", posts);

      html.push(
      '<div class="row">',
        '<div class="col-sm-12">',
          '<img src="' + user.pic + '" class="lg-profile-image post-user-img">',
          '<div class="post-user-name">' + user.username + '</div>',
          '<div class="post-user-comment">' + this.value + '</div>',
        '</div>',
      '</div>',
      '<div class="row">',
        '<div class="col-sm-11 col-offset-1 pull-right">',
          '<div class="panel panel-default comment-panel">',
            '<div class="panel-body">',
              '<form method="post" action="#" id="' + post_number + '">',
                '<input type="submit" style="position: absolute; left: -9999px" class = />',
              '</form>',
              '<textarea rows="1" class="post_comment" form="' + post_number + '" placeholder="post a comment"></textarea>',
            '</div>',
          '</div>',
        '</div>',
      '</div>');

      $('#post-panel').append(html.join(''));
      $('#myModal').modal('toggle');
      this.value = ''; // Clear input

      return false;
    }
  });
});