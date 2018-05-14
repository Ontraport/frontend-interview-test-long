/**
 * app.js - main entry point for the app
 *
 * In effect, this acts as a controller between the models and their views.
 */

import Post from './model/post.js';
import User from './model/user.js';

import JsonPostStorage from './model/JsonPostStorage.js';
// import JsonUserStorage from './model/JsonUserStorage.js';

// for purposes of this, we're always user 5. Otherwise would have another mechanism for getting this id.
const current_user_id = 5;

//sources for our data, load them in async later
// const posts_source = new JsonPostStorage('data/posts.json');
// const users_source = new JsonUserStorage('data/users.json');

function renderPost(post) {
    let $text = $('<div>Hope this updates</div>');
    $('#page').append($text);
}

setTimeout(() => {
    renderPost();
}, 50);
