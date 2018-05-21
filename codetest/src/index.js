/**
 * app.js - main entry point for the app
 *
 * This sets up all the data layers, prepares the views, and renders them into the page.
 */

//some models
import {Post} from './model/post.js';
import {User} from './model/user.js';

//storage/access layers
import {JsonPostStorage} from './model/JsonPostStorage.js';
import {JsonUserStorage} from './model/JsonUserStorage.js';

//and views too
import PostRenderer from './view/PostRenderer.js';
import UserRenderer from './view/UserRenderer.js';

//other renderers
import {makeLightbox} from './lightbox.js';

// for purposes of this, we're always user 5. Otherwise would have another mechanism for getting this id.
const current_user_id = 5;

// import '../data/posts.json';

//sources for our data, load them in async later
const posts_source = new JsonPostStorage( 'posts.json' );
const users_source = new JsonUserStorage( 'users.json' );
// const users_source = new JsonUserStorage('data/users.json');

const post_renderer = new PostRenderer( users_source );

/**
 * a simple page rendering function
 */
let doRender = function( posts ) {
    $( '#page > div' ).remove();
    posts_source.loadAll().forEach( ( post_data ) => {
        $( '#page' ).append( post_renderer.renderFullPost( post_data ) );
    } );
};

// This is the main point where the content on the page is created.
setTimeout( function() {
    // render the page
    doRender();

    let current_user = users_source.loadOne( current_user_id );
    $( '#user-box' ).append( UserRenderer.renderUser( current_user ) );
    $( '#user-pic' ).attr( 'src', current_user.pic );

    // a callback to use when the user is making a post
    let makeNewPost = function( content ) {
        posts_source.save( new Post( current_user_id,
            new Date(),
            content ) );
        //render the posts
        doRender();
    };

    $( '#new-post' ).on( 'click', () => {
        $( 'body' ).append( makeLightbox( makeNewPost ) );
    } );
}, 0 );
