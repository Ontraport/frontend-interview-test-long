/**
 * app.js - main entry point for the app
 *
 * In effect, this acts as a controller between the models and their views.
 */

import * as Post from 'model/post.js';
import * as User from 'model/user.js';

// for purposes of this, we're always user 5. Otherwise would have another mechanism for getting this id.
const current_user_id = 5;

//sources for our data, load them in async later
const posts_source = 'data/posts.json';
const users_source = 'data/users.json';

