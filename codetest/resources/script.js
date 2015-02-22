/*
|------------------------------------------------
| script.js
|------------------------------------------------
|
| JavaScript functions for the Ontraport Front End Test (Long)
|
| @author     Spencer Bartz
| @version    1.0
| @copyright  Copyright 2015 Spencer Bartz
| @license    I don't know
|
| @link       http://www.spencerbartz.com
|
*/


//Global Variables (we can probably just use Box instead, assuming performance is not an issue)
var posts;
var users;
var mybox;

/**
 * init(): Initializes the web app. Loads posts.json and users.json
 * and then stores them in our "Box" object from Box.js
 * @access  public
 * @return  void
 */
function init()
{
	posts = JSON.parse(loadJSON("data/posts.json"));
	users = JSON.parse(loadJSON("data/users.json"));
	Box.store('posts', posts);
	Box.store('users', users);
}

function getCurrentUserId()
{
	return 5;
}

/**
 * loadJSON(): Attempts to load a JSON file stored locally. The
 * first attempt will fail on some browsers such as Chrome if
 * the html file is simply run off the file system and not served
 * via a web server. If this is the case, the XMLHttpRequest status
 * will be set to 0 and we will attempt to load the file from
 * http://spencerbartz.com/codetest/data/xxx.json
 * @access  public
 * @param   String file		The relative path to the JSON file
 * @return  text of the JSON file on success, null on failure
 */
function loadJSON(file)
{
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', file, false);

	try
	{
		xobj.send(null);
	}
	catch(err)
	{
		console.error(err);
	}

	if(xobj.status === 200)
	{
		//We successfully loaded the local JSON file. Whew
		return xobj.responseText;
	}
	else if(xobj.status === 0)
	{
		//Local load failed
		console.error("Could not load local json file. Probably because you are using Chrome");
		return null;
	}
	else
	{
		//Some other no good status showed up
		console.error("Failed to retrieve JSON file. XMLHttpRequest status: " + xobj.status);
		return null;
	}
}

/**
 * printPosts(): Print the contents of posts.json in a nice format.
 * In order to display the thumbnail associated with the user who
 * made the post, the userId value of each post object is used to then
 * look up the user based on our user list from users.json.
 * @access  public
 * @return  void
 */
function printPosts(postDiv)
{
	var html = "";

	if(!posts)
	{
		console.error("Posts has not yet been initialized");
	}
	else
	{
		html += '<ul class="post rounded">';
		html += '<li><div id="update-title">Updates</div></li>';
		//Each Post object contains an array of comment objects, which are
		//nearly identical to Posts except they have a postId
		for(var i = 0; i < posts.length; i++)
		{
			html += printLi(posts[i].id, posts[i].userId, posts[i].date, posts[i].content);

			//handle the comments in the same way we handled the original list
			html += '<li class="rounded"><ul class="comment rounded">';

			if(posts[i].comments.length > 0)
			{
				for(var j = 0; j < posts[i].comments.length; j++)
				{
					html += printCommentLi(posts[i].comments[j].id, posts[i].comments[j].userId, posts[i].comments[j].date, posts[i].comments[j].content);
				}
			}

			html += '<li class="comment-form rounded"><form onsubmit="return false;">';
			html += '<input id="comment_' + posts[i].id + '" type="text" class="comment-input rounded" onkeyup="commentKeyUpHandler(event)" placeholder="Post a comment"/>';
			html += "</form></li>";
			html += "</ul></li>";
		}

		html += "</ul>";
	}

	document.getElementById(postDiv).innerHTML = html;
}

/**
 * printLi(): Print a list element containing a user avatar, username,
 * and content of the post
 * @access  public
 * @param   int id      		the id of the post
 * @param   int userId			the id of the user who made the post
 * @param   Date date    		the date the post was made
 * @param   Boolean miniImage   resize profile pic if true
 * @param   String content		the text comment to display
 * @return  void
 */
function printLi(id, userId, date, content)
{
	var user = getUserById(userId);
	var html = "";

	//append HTML for the avatar
	html += '<li class="post rounded"><div class="comment-left"><img class="avatar rounded" src="' + user.pic + '" /></div>';

	//append HTML for the username and content
	html += '<div class="comment-right rounded"><div class="bold-link">' + user.username + '</div><div class="content">' + content + '</div></li>';

	return html;
}

function printCommentLi(commentId, userId, date, content)
{
	var user = getUserById(userId);
	var html = "";

	//append HTML for the avatar
	html += '<li class="comment rounded"><div class="comment-left"><img class="avatar mini rounded" src="' + user.pic + '" /></div>';

	//append HTML for the username and content
	html += '<div class="comment-right rounded"><div class="bold-link">' + user.username + '</div><div class="content">' + content + '</div></li>';

	return html;
}

/**
 * getUserById(): Obtain a user object from the users list
 * @access  public
 * @param   int id		The id of the user to look up
 * @return  User Object or null? if not found
 */
function getUserById(userId)
{
	return users[users.indexOf("id", userId)];
}

/**
 * getUserById(): Obtain a post object from the post list
 * @access  public
 * @param   int postId		The id of the post to look up
 * @return  User Object or null? if not found
 */
function getPostById(postId)
{
	return posts[posts.indexOf("id", postId)];
}

/**
 * printMiniAcctImage(): Shows a mini version of the
 * avatar of the currently logged in user
 * @access  public
 * @param   int id				The id of the user
 * @param   String imgDivId		The id of the div in which we want to display the img
 * @return  void
 */
function printMiniAcctImage(userId, imgDivId)
{
	var user = getUserById(userId);

	if(user)
	{
		var img = document.getElementById(imgDivId);
		img.src = user.pic;
		var dimension = scaleSize(img.width, img.height, 25, 25);
		img.width = dimension.width;
		img.height = dimension.height;
	}
	else
	{
		console.error("User was not found");
	}
}

/**
 * printProfileInfo(): Shows the avatar and username of the currently logged in user
 * @access  public
 * @param   int id				The id of the user
 * @param   String imgDivId		The id of the div in which we want to display the img
 * @return  void
 */
function printProfileInfo(userId, imgId, userNameDivId)
{
	var user = getUserById(userId);

	if(user)
	{
		var img = document.getElementById(imgId);
		var username = document.getElementById(userNameDivId);

		img.src = user.pic;
		username.innerHTML = user.username;

	}
	else
	{
		console.error("User was not found");
	}
}

/*------------------------------------------------------------------------------------*/
/*************************** LIGHTBOX DIALOG FUNCTIONS ********************************/
/*------------------------------------------------------------------------------------*/

/**
 * showDialog(): Dims the screen and displays a small form for
 * users to enter status updates.
 * @access  public
 * @param   String dialogId		The id of our status update dialog div
 * @return  void
 */
function showDialog(dialogId)
{
	centerDialog(dialogId);
	toggleOverlay();
}

/**
 * toggleOverlay(): Sets the overlay div to "visible," dimming the screen.
 * @access  public
 * @return  void
 */
function toggleOverlay()
{
	var el = document.getElementById("overlay");
	el.style.visibility = (el.style.visibility == "hidden") || (el.style.visibility == "") ? "visible" : "hidden";
}

/**
 * centerDialog(): Centers the dialog div on the screen
 * @access  public
 * @param   String dialogId		The id of our status update dialog div
 * @return  void
 */
function centerDialog(dialogId)
{
	var dlgDiv = document.getElementById(dialogId);

	if(dlgDiv)
	{
		dlgDiv.style.left = ((window.innerWidth / 2) - (dlgDiv.offsetWidth / 2)) + "px";
		dlgDiv.style.top = ((window.innerHeight / 2) - (dlgDiv.offsetHeight)) + "px";
	}
	else
	{
		console.error("Could not obtain dialog div");
	}
}

/**
 * closeDialog():
 * @access  public
 * @param   String dialogId		The id of our status update dialog div
 * @return  void
 */
function closeDialog()
{
	var overlay = document.getElementById("overlay");
	fadeCallBack(overlay, toggleOverlay);
}

function fadeCallBack(element, onCompleteFunc)
{
    var op = 1;  // initial opacity
    var timer = setInterval(function()
    {
        if (op <= 0.1)
        {
            clearInterval(timer);

          	//call the supplied function upon completion
            onCompleteFunc();

            //Reset Div opacity
            element.style.opacity = 1;
        }
        else
        {
			//gradually decrease the opacity
        	element.style.opacity = op;
        	element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        	op -= op * 0.1;
		}
    }, 25);
}

/*------------------------------------------------------------------------------------*/
/*************************** POST INSERTION FUNCTIONS *********************************/
/*------------------------------------------------------------------------------------*/

/**
 * keyUpHandler():
 * @access  public
 * @param   Event e		The keypress event
 * @return  void
 */
function keyUpHandler(event)
{
	var x = event.which || event.keyCode;

	if(event.keyCode == 13)
	{
		closeDialog();
		insertPost(getCurrentUserId(), event.currentTarget.value);
		event.currentTarget.value = "";
		event.currentTarget.blur();
	}
}

/**
 * insertPost():
 * @access  public
 * @param   String userId		The id of the user making the post
 * @param   String content		The post text
 * @return  void
 */
function insertPost(userId, content)
{
	console.log("inserting post");

	var date = new Date();

	var newPost =
	{
		"id": createPostId(),
		"userId": userId,
		"date": date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
		"content": content,
		"comments": []
	}

	posts.push(newPost);
	printPosts("posts");
}

/**
 * createPostId(): Since we don't have any access to an
 * autoincrement type function we would have in SQL, we
 * contrive an ID that is not currently in our posts list.
 * Normally we would order them by date and then choose an
 * ID but our sample data contained no dates. While insertPost()
 * does add the current date, it would only mean new posts could
 * be ordered, resulting in a semi-ordered list which probably
 * wouldn't exist in real life anyway so this is just a dumb
 * function which assumes the last post in the list is the most
 * recent due to the nature of insertPost();
 * @access  public
 * @return  int		the new computed Id
 */
function createPostId()
{
	var newId = posts[posts.length - 1].id + 1;

	while(posts.indexOf("id", newId) != -1)
	{
		newId++;
	}

	return newId;
}

/**
 * commentKeyUpHandler():
 * @access  public
 * @param   Event e		The key event
 * @return  void
 */
function commentKeyUpHandler(event)
{
	var x = event.which || event.keyCode;

	if(event.keyCode == 13)
	{
		insertComment(getCurrentUserId(), event.currentTarget.id.split("_")[1], event.currentTarget.value);
		event.currentTarget.value = "";
		event.currentTarget.blur();
	}
}

/**
 * insertComment():
 * @access  public
 * @return  void
 */
function insertComment(userId, postId, content)
{
	console.log("userid: " + userId + " postid: " + postId + " content: " + content);
	console.log(typeof postId);
	console.log(postId.length);
	console.log(parseInt(postId));
	console.log(postId.charAt(0));
	console.log(postId.charAt(1));
	console.log(postId.charAt(2));



	var post = getPostById(parseInt(postId));
	console.log("##################");
	console.log(post);
	console.log("##################");
	var comments = post.comments;
	console.log(comments);
	var date = new Date();

	var newComment =
	{
		"id": createCommentId(comments),
		"postId": postId,
		"userId": userId,
		"date": date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
		"content": content,
	}

	comments.push(newComment);
	printPosts("posts");
	console.log(newComment);
}

/**
 * createCommentId():
 * @access  public
 * @return  void
 */
function createCommentId(comments)
{
	var newId;

	console.log("comments: " + comments);

	if(comments.length == 0)
	{
		newId = 1;
	}
	else
	{
		newId = comments[comments.length - 1].id;
	}

	while(comments.indexOf("id", newId) != -1)
	{
		newId++;
	}

	return newId;
}

/*------------------------------------------------------------------------------------*/
/*************************** BORROWED FUNCTIONS *********************************/
/*------------------------------------------------------------------------------------*/

// From Stack Overflow http://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array
Array.prototype.indexOf = function arrayObjectIndexOf(property, value)
{
    for (var i = 0, len = this.length; i < len; i++)
    {
        if (this[i][property] === value)
        	return i;
    }
    return -1;
}

// From http://www.ajaxblender.com/howto-resize-image-proportionally-using-javascript.html
function scaleSize(maxW, maxH, currW, currH)
{
	var ratio = currH / currW;

	if(currW >= maxW && ratio <= 1)
	{
		currW = maxW;
		currH = currW * ratio;
	}
	else if(currH >= maxH)
	{
		currH = maxH;
		currW = currH / ratio;
	}

	return {"width": currW, "height": currH};
}