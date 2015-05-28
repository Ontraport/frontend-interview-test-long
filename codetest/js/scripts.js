// get and parse the users data
$.getJSON("data/users.json", function(data) {
	var info = [],
		posts = [],
		users = data;

	// get and parse the post data
	$.getJSON("data/posts.json", function(theData){
		posts = theData
		
		// combines user and posts data to create a data store that the jQuery templating engine can use
		function combineData(){
			
			$.each(posts, function(key, value){
				var tempObj = {},
					obj = value;
					
				for (var key in obj) {
				   if (obj.hasOwnProperty(key)) {
					   tempObj[key] = value;
				    }
				}
				info.push(tempObj)
			});
			
			console.log(info);
			
		}
		
		// query's the id of the object passed and returns the a jquery object of the item with id
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
	});
});