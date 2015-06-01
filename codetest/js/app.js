function getURLVars(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function removeParam(key, sourceURL) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}

// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

$("#dialog").dialog({
      autoOpen: false,
	  width: 390,
	  height: 185,
	  minHeight: 185,
	  minWidth: 390
    });

$(".dialog-opener").click(function() {
     $("#dialog").dialog("open");
});

// Get and parse the users data
//
// I have decided to not check for localStorage support because I have done research on what
// browsers support localStorage and the market share of browsers that have localStorage support
// after such reasearch I have concluded that the number of browsers that do not support localStorage
// at this point, is almost non-existent.
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
		
		var networkFeed = localStorage.getItem("the-network-feed");
		
		combineData();
		if(networkFeed === null || networkFeed == ""){
			localStorage.setItem("the-network-feed", JSON.stringify(info));
		}
		
		$("#post-template").tmpl(JSON.parse(networkFeed)).appendTo(".posts");
		
		// adding post update to data store and subsequently the page
		var comment = localStorage.getItem("comment");
		
		if(comment.length > 0){
			var update = {
				"comments": [],
				"content": comment,
				"id": getRandomArbitrary(10, 50),
				"userInfo": query(users, "id", 5)[0]
			}
			
			info["posts"].push(update);
			$("#post-template").tmpl(info).appendTo(".posts");
			localStorage.setItem("comment","");
		}
	});
});

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

$(document).keypress(function(e) {
    if(e.which == 13) {
		$("#post-update").trigger("submit");
    }
});