$(document).ready(function(){
	$(".modal-body-text").submit(function(event){
		var inputField = $(this).children("textarea");
		var userInput = inputField.val();
		var posts = $("#media");
		var html = "<div class='media'>"
		html += "<div class='media-left'>"
		html += "<a href='#'>"
		html += "<img src='images/profile/daniel-craig.jpg' id='post-profile-pic' alt='Profile Picture'>"
		html += "</a>"
		html += "</div>"
		html += "<div class='media-body post-body'>"
		html += "<h4 class='media-heading post-name'>"
		html += "Daniel Craig"
		html += "</h4>"
		html += "<p class='post-content'>"
		html += userInput
		html += "</p>"
        html += "<textarea class='form-control comment-boxes' rows='1' placeholder='post a comment'>"
        html += "</textarea>"
	    html += "</div>"
		html += "</div>"	
	    html += "</div>";
		posts.append(html);
		$("#myModal").modal("hide");
		inputField.val("");
	});

	$(".form-control").keypress(function(event){
        if (event.which == 13) {
        	$(".form-control").submit();
        	event.preventDefault();
    	}
    });
});	
