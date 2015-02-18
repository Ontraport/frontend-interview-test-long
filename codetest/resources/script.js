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


//Global Variables (we can probably just use Box instead)
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

/**
 * loadJSON(): Print a list element containing a user avatar, username,
 * and content of the post
 * @access  public
 * @param   String file		The relative path to the JSON file
 * @return  text of the JSON file on success, null on failure
 */

function loadJSON(file)
{
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', file, false);
	xobj.send(null);

	if(xobj.status === 200)
	{
		return xobj.responseText;
	}
	else
	{
		console.error("Failed to retrieve JSON file. XMLHttpRequest status: " + xobj.status);
		return null;
	}
}

/**
 * printLi(): Print a list element containing a user avatar, username,
 * and content of the post
 * @access  public
 * @param   int id      the id of the post
 * @param   int userId  the id of the user who made the post
 * @param   Date date    the date the post was made
 * @param   String comment    the text comment to display
 * @return  void
 */
function printLi(id, userId, date, content)
{
	var user = getUserById(userId);

	//write HTML for the avatar
	document.write('<li><div class="comment-left"><img class="avatar" src="' + user.pic + '" /></div>');

	//write HTML for the username and content
	document.write('<div class="comment-right"><a href="#">' + user.username + '</a><br/>' + content + '</div></li>');
}

/**
 * printPosts(): Print the contents of posts.json in a nice format.
 * In order to display the thumbnail associated with the user who
 * made the post, the userId value of each post object is used to then
 * look up the user based on our user list from users.json
 * @access  public
 * @return  void
 */
function printPosts()
{
	if(!posts)
	{
		console.log("Error: Posts has not yet been initialized");
	}
	else
	{
		//TODO: change this into printList or something
		document.write("<ul>");
		for(var i = 0; i < posts.length; i++)
		{
			printLi(posts[i].id, posts[i].userId, posts[i].date, posts[i].content);

			//handle the comments in the same way we handled the original list
			document.write("<li><ul>");
			if(posts[i].comments.length > 0)
			{
				for(var j = 0; j < posts[i].comments.length; j++)
				{
					printLi(posts[i].comments[j].id, posts[i].comments[j].userId, posts[i].comments[j].date, posts[i].comments[j].content);
				}
			}

			document.write('<li><form onsubmit="return reply(' + posts[i].id + ')">');
			document.write('<input type="text" class="rounded" />');
			document.write("</form></li>");
			document.write("</ul></li>");
		}

		document.write("</ul>");
	}
}

/**
 * reply():
 * @access  public
 * @param   int id
 * @return
 */
function reply(id)
{
	console.log("id: " + id);
	return false;
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
 * checkLogin(): Dummy function which gets the profile pic
 * of the user who is currently logged in. In a complete web app
 * we would do the actual checking on the server side.
 * @access  public
 * @param   int id				The id of the user to "check"
 * @param   String imgDivId		The id of the div in which we want to display the img
 * @return  void
 */
function checkLogin(userId, imgDivId)
{
	var user = getUserById(userId);

	if(user)
	{
		var el = document.getElementById(imgDivId);
		el.src = user.pic;
	}
	else
	{
		console.log("User was not found");
	}
}


/*************************** LIGHTBOX DIALOG FUNCTIONS ********************************/

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
	toggleOverlay();
}


/**
 * keyUpHandler():
 * @access  public
 * @param   Event e		The keypress event
 * @return  void
 */
function keyUpHandler(event)
{
	var x = event.which || event.keyCode;
	console.log("key code: " + event.keyCode);

	if(event.keyCode == 13)
		closeDialog();
}