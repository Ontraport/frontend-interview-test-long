// http://www.abeautifulsite.net/vertically-centering-bootstrap-modals/
$(function() {
    function reposition() {
        var modal = $(this),
            dialog = modal.find('.modal-dialog');
        modal.css('display', 'block');
        
        // Dividing by two centers the modal exactly, but dividing by three 
        // or four works better for larger screens.
        dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
    }
    // Reposition when a modal is shown
    $('.modal').on('show.bs.modal', reposition);
    // Reposition when the window is resized
    $(window).on('resize', function() {
        $('.modal:visible').each(reposition);
    });
});

// Modal form submit
$(document).ready(function() {
    $('.modal_comment').keydown(function(event) {
        if (event.keyCode == 13) {
            this.form.submit();
            return false;
         }
    });
});

$(document).ready(function() {
  var users = [];
  var posts = [];

  $.ajax({
    url: "data/users.json",
    async: false,
    dataType: 'json',
    success: function(data) {
      users = data.slice(0);
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

  $('#profile-nav-img').append('<img src="' + users[4].pic + '" class="nav-img sm-profile-image">');
  $('#profile-panel-img').append('<img src="' + users[4].pic + '" class="lg-profile-image">');
  $('#profile-panel-name').append("_" + users[4].username);

});