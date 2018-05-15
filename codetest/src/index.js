/**
 * app.js - main entry point for the app
 *
 * In effect, this acts as a controller between the models and their views.
 */

//some models
import {Post} from './model/post.js';
import {User} from './model/user.js';

//storage/access layers
import {JsonPostStorage} from './model/JsonPostStorage.js';
import {JsonUserStorage} from './model/JsonUserStorage.js';

//and views too
import PostRenderer from './view/PostRenderer.js';

// for purposes of this, we're always user 5. Otherwise would have another mechanism for getting this id.
const current_user_id = 5;

//sources for our data, load them in async later
const posts_source = new JsonPostStorage( '' );
const users_source = new JsonUserStorage( '' );
// const users_source = new JsonUserStorage('data/users.json');

const post_renderer = new PostRenderer( users_source );

// function renderPost(post) {
//     $('#page').append('<div class="post">'
//                       + '<div class="post-username">'
//                       + post.userId + ' at ' + post.date
//                       + '</div>'
//                       + post.content
//                       + '</div>');
// }

setTimeout( () => {
    posts_source.loadAll().forEach( ( post_data ) => {
        // renderPost(Post.fromJson(post_data));

        $( '#page' ).append( post_renderer.renderFullPost( post_data ) );

    } );
}, 100 );
