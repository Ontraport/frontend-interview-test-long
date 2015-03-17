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

$.getJSON( "data/users.json", function(data) {
    //for (var i=0, len=data.length; i < len; i++) {
        console.log(data[i].id);
    //}
});