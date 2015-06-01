// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Initiate the jQuery UI modal for the "Post an Update" form
$("#dialog").dialog({
      autoOpen: false,
	  width: 390,
	  height: 185,
	  minHeight: 185,
	  minWidth: 390
    });

// When the "Post an Update" link in the header is clicked open the modal
$(".dialog-opener").click(function() {
     $("#dialog").dialog("open");
});

// Get and parse the users data
//
// I have decided to not check for localStorage support because I have done research on what
// browsers support localStorage and the market share of browsers that have localStorage support
// after such reasearch I have concluded that the number of browsers that do not support localStorage
// at this point, is almost non-existent.
//
// I decided not to add in support for Box.js because I tested it out on the testing ground page and it 
// said Box was unsupported in a browser (Safari 8) that I know supports localStorage so I just opted to use localStorage instead
$.getJSON("data/users.json", function(data) {
	var info = {}
		posts = [],
		users = data;

	// Get and parse the post data
	$.getJSON("data/posts.json", function(theData){
		var thePosts = [];
		
		posts = theData;
		
		// Combines user and posts data to create a data store that the jQuery templating engine can use
		function combineData(){
			
			$.each(posts, function(key, value){
				var tempObj = {},
					obj = value;
					
				for (var key in obj) {
				   if (obj.hasOwnProperty(key)) {
					   if(key == "userId"){
						   var result = query(users, "id", obj[key]);
						   tempObj["userInfo"] = result[0];
					   } else if(key == "comments"){
						   var comments = obj[key];
						   if(comments.length > 0){
							   for(key in comments){
								   var comment = comments[key];
								   for(var key in comment){
									   if(key == "userId"){
									   		var result = query(users, "id", comment[key]);
											comment["userInfo"] = result[0];
									   }
								   }
							   }
						   }
						   tempObj["comments"] = comments;
						   
					   } else if (key == "id"){
						   tempObj[key] = obj[key];
 					   }else if(key == "content"){
						   tempObj[key] = obj[key];
					   }
				    }
				}
				thePosts.push(tempObj);
				info["posts"] = thePosts;
			});
		}
		
		// Queries the id of the object passed and returns the a jquery object of the item with id
		// a helper function to the combineData function
		function query(obj, key, val) {
		    var objects = [];
		    for (var i in obj) {
		        if (!obj.hasOwnProperty(i)) continue;
		        if (typeof obj[i] == 'object') {
		            objects = objects.concat(query(obj[i], key, val));
		        } else if (i == key && obj[key] == val) {
		            objects.push(obj);
		        }
		    }
		    return objects;
		}
		
		// Store the current value of the of the post data in localStorage to a variable
		var networkFeed = localStorage.getItem("the-network-feed");
		
		// Combine the data in data/users.json and data/posts.json to create a data structure that can be passed
		// to the jQuery templating engine
		combineData();
		
		// If the part of localStorage where we store the user and posts data is empty set it to the newly generated data
		if(networkFeed === null || networkFeed == ""){
			localStorage.setItem("the-network-feed", JSON.stringify(info));
		}
		
		// Otherwise we can assume that the user/posts data is already in localStorage, so we'll just get it,
		// parse it using jQuery/JavaScripts native JSON parser and then pass the parsed data to the jQuery templating engine
		// and tell the jQuery templating plugin to append the HTML of the parsed template the "posts" div
		$("#post-template").tmpl(JSON.parse(networkFeed)).appendTo(".posts");
		
		// When the page reloads as a result of the "Post an Update" form being submitted this code will get 
		// (techically this code will be run every time the page reloads for any reason, but it will only have an effect
		// when the page is reloaded as a result of the submission of the "Post an Update" form because of the how we stored
		// the value of the comment in the localStorage key "comment")
		// 
		// Here we are retrieving the value of the textarea in the "Post an Update" modal
		var comment = localStorage.getItem("comment");
		
		// Then if the value of the textarea is not nothing (this code would only be run when the page is reloaded because of the "Post an Update" form being submitted for the above reason)
		if(comment.length > 0){
			
			// Build a JavaScript object to push on to the array of generated user/posts data
			var update = {
				"comments": [],
				"content": comment,
				"id": getRandomArbitrary(10, 50),
				"userInfo": query(users, "id", 5)[0]
			}
			
			// set a local variable of the generated user/posts data to value of the user/posts data from localStorage 
			// (to get any new post updates that may have been added to localStorage recently)
			info = JSON.parse(localStorage.getItem("the-network-feed"));
			
			// Push on to the local variable the object we built containing the object we built for our new post update
			info["posts"].push(update);
			
			// Store the new post update in localStorage
			localStorage.setItem("the-network-feed", JSON.stringify(info));
			
			// Re-render the jQuery template with our new data (which is really the old data just with the new post update appended to it)
			$("#post-template").tmpl(JSON.parse(localStorage.getItem("the-network-feed"))).appendTo(".posts");
			
			// Set the localStorage key containing the new post update text to nothing since we've just finished adding the post to
			// the data store and reloading the page with it
			localStorage.setItem("comment","");
		}
	});
});

// When someone submits the "Post an Update" form inside the modal then we are
// getting the value of the textarea. setting the "comment" key in localStorage, dismissing the modal and reloading the page
$("#post-update").submit(function(e){
	e.preventDefault();
	
	var comment = $(this).find("textarea").val(),
	form = this;
	
	localStorage.setItem("comment", comment);
	form.reset();
	$('.ui-dialog .ui-button').trigger("click");
	
	window.location = "index.html";
	
	return false;
});

// When the "Enter" or "Return" key is pressed (the Enter/Return key's code is 13) then trigger a submit on the "Post an Update" form 
$(document).keypress(function(e) {
    if(e.which == 13) {
		$("#post-update").trigger("submit");
    }
});