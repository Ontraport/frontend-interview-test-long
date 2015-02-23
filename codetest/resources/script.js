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

/*------------------------------------------------------------------------------------*/
/********************** INIT AND POST/COMMENT DISPLAY FUNCTIONS ***********************/
/*------------------------------------------------------------------------------------*/

/**
 * init(): Initializes the web app. Loads posts.json and users.json
 * and then stores them in our "Box" object from Box.js
 * @access  public
 * @return  void
 */
function init()
{
	if(!Box.isset('posts') || !Box.isset('users'))
	{
		var posts = JSON.parse(loadJSON("data/posts.json"));
		var users = JSON.parse(loadJSON("data/users.json"));
		Box.store('posts', posts);
		Box.store('users', users);
	}
}

/**
 * loadJSON(): Attempts to load a JSON file stored locally.
 * This will fail on browsers like Chrome that require the
 * local file be hosted (like localhost or on some website)
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
 * @param   Div postDiv		The div to which we will write the list of posts / comments
 * @access  public
 * @return  void
 */
function printPosts(postDiv)
{
	var posts = Box.fetch('posts');
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
		//nearly identical to Posts except they have a postId and no comment list
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

			html += '<li class="comment-form rounded">';
			html += '<div id="comment-avatar_' + posts[i].id + '" class="comment-avatar">';
			html += '<img src="' + getUserById(getCurrentUserId()).pic + '" class="mini"/>';
			html += '</div>';

			//The hefty comment input element
			html += '<div class="comment-input-container">';
			html += '<input id="comment_' + posts[i].id + '" ';
			html += 'type="text" class="rounded comment-input" onkeyup="commentKeyUpHandler(event)" ';
			html += 'onfocus="showCommentAvatar(\'' + posts[i].id + '\');" ';
			html += 'onblur="hideCommentAvatar(\'' + posts[i].id + '\');" placeholder="Post a comment"/>';
			html += '</div>';

			html += "</li>";
			html += "</ul></li>";
		}

		html += "</ul>";
	}

	document.getElementById(postDiv).innerHTML = html;
}

/**
 * printLi(): Print a post containing a user avatar, username,
 * and content of the post
 * @access  public
 * @param   int id      		the id of the post
 * @param   int userId			the id of the user who made the post
 * @param   Date date    		the date the post was made
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

/**
 * printCommentLi(): Print a comment with an avatar, username and content
 * @access  public
 * @param   int commentId      	the id of the comment
 * @param   int userId			the id of the user who made the post
 * @param   Date date    		the date the post was made
 * @param   String content		the text comment to display
 * @return  void
 */
function printCommentLi(commentId, userId, date, content)
{
	var user = getUserById(userId);
	var html = "";

	//append HTML for the avatar
	html += '<li class="comment"><div class="comment-left"><img class="avatar mini rounded" src="' + user.pic + '" /></div>';

	//append HTML for the username and content
	html += '<div class="comment-right rounded"><div class="bold-link">' + user.username + '</div><div class="content">' + content + '</div></li>';

	return html;
}

/**
 * getPostById(): Obtain a post object from the post list
 * @access  public
 * @param   int postId		The id of the post to look up
 * @return  Post Object or null if not found
 */
function getPostById(postId)
{
	var posts = Box.fetch('posts');
	return posts[posts.indexOf("id", postId)];
}

/*------------------------------------------------------------------------------------*/
/*************************** USER ACCOUNT FUNCTIONS ********************************/
/*------------------------------------------------------------------------------------*/

/**
 * getCurrentUserId(): For this exercise we assume there
 * was some authorization and we know the currently logged
 * in user is userId 5
 * @access  public
 * @return  void
 */
function getCurrentUserId()
{
	return 5;
}

/**
 * getUserById(): Obtain a user object from the users list
 * @access  public
 * @param   int id		The id of the user to look up
 * @return  User Object or null if not found
 */
function getUserById(userId)
{
	var users = Box.fetch('users');
	return users[users.indexOf("id", userId)];
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
		img.width = 25;
		img.height = 25;
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

/**
 * showCommentAvatar(): Show the avatar (mini) of the currently logged
 * in user to the left of the comment input field when it has focus
 * @access  public
 * @return  void
 */
function showCommentAvatar(id)
{
	var div = document.getElementById("comment-avatar_" + id);
	div.style.display = "inline";

	var input = document.getElementById("comment_" + id);
	input.style.width = "90%";
}

function hideCommentAvatar(id)
{
	var div = document.getElementById("comment-avatar_" + id);
	div.style.display = "none";

	var input = document.getElementById("comment_" + id);
	input.style.width = "100%";
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
	toggleTextArea();
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
 * toggleTextArea(): Fading the text areain the lightbox became a problem on firefox
 * as it would remain visible after the overlay disappeared. Although
 * simply hiding the text area doesn't actually fade it out with the
 * overlay, it is a cheap fix that doesn't require jquery.
 * @access  public
 * @return  void
 */
function toggleTextArea()
{
	var el = document.getElementById("dialogText");
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
 * closeDialog(): Closes the light box
 * @access  public
 * @return  void
 */
function closeDialog()
{
	var overlay = document.getElementById("overlay");
	fadeCallBack(overlay, toggleOverlay);
	toggleTextArea();
}

/**
 * fadeCallBack():
 * @access  public
 * @param   Element element				The element to fade
 * @param   Function onCompleteFunc		The function to execute upon completion
 * @return  void
 */
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
 * keyUpHandler(): Check for "enter" key being pressed on the text area in
 * the "Update Status" dialog. Insert the text in the text area if the user
 * presses enter.
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
 * insertPost(): Inserts a new post object into our list of posts stored in Box
 * @access  public
 * @param   String userId		The id of the user making the post
 * @param   String content		The post text
 * @return  void
 */
function insertPost(userId, content)
{
	var date = new Date();

	var newPost =
	{
		"id": createPostId(),
		"userId": userId,
		"date": date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
		"content": content,
		"comments": []
	}

	var posts = Box.fetch('posts');
	posts.push(newPost);
	Box.store('posts', posts);
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
	var posts = Box.fetch('posts');
	var newId = posts[posts.length - 1].id + 1;

	while(posts.indexOf("id", newId) != -1)
	{
		newId++;
	}

	return newId;
}

/**
 * commentKeyUpHandler(): Check for "enter" key being pressed on the input field that
 * appears under the comment list for each post. Insert the input value if the user
 * presses enter.
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
 * insertComment(): Inserts a new comment in the comments list for a particular
 * post stored in our posts list inside Box.
 * @access  public
 * @param Int userId 		Id of the user making the comment
 * @param String postId 	Id of the post to which we are making the comment
 * @param String content	Comment text
 * @return  void
 */
function insertComment(userId, postId, content)
{
	var posts = Box.fetch('posts');
	var post = getPostById(parseInt(postId));
	var date = new Date();

	var newComment =
	{
		"id": createCommentId(post.comments),
		"postId": postId,
		"userId": userId,
		"date": date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
		"content": content,
	}

	//add new comment to this post
	post.comments.push(newComment);

	//replace the old post with the new one
	posts[posts.indexOf("id", parseInt(postId))] = post;

	//overwrite the posts list in Box
	Box.store('posts', posts);

	//update the post list in the display
	printPosts("posts");
}

/**
 * createCommentId(): See createPostId(), same concept however
 * we also have to handle the case where no comments have been
 * made yet.
 * @access  public
 * @param Array comments	The comment list of the post we are commenting on
 * @return  void
 */
function createCommentId(comments)
{
	var newId;

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
/*************************** BORROWED FUNCTIONS ***************************************/
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