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

$(".fancybox").fancybox({ 
	"scrolling": "no",
    "showCloseButton": false,
    "transitionIn": "none",
    "transitionOut": "none",
    "height": "auto",
    "width": "auto",
    "content": "<form method=\"GET\" class=\"fancybox\"><textarea name=\"comment\" id=\"\" cols=\"30\" rows=\"10\" placeholder=\"Whats on your mind?\"></textarea><br><button type=\"submit\">Submit</button></form>"
});

// Get and parse the users data
//
// Use Box to write out "info" to localStorage
// then use Box to read the data from localStorage, set it, and refresh the template
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
		
		combineData();
		$("#post-template").tmpl(info).appendTo(".posts");
	});
});

window.onload = function(){
	var params = getURLVars(),
	 	comment = "";
 
	if(params.length > 0 && params.hasOwnProperty("comment")){
		comment = decodeURIComponent(params["comment"].replace(/(\+)/g," "));
		localStorage.setItem("comment", comment);	
		window.location = "index.html";
	}
};
