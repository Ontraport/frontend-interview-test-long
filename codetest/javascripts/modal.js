$(function() {
  $("#post-link").click(function(event) {
    $(this).modal({
      fadeDuration: 250,
      opacity: .50,
      showClose: false
    });
    return false;
  });
});
