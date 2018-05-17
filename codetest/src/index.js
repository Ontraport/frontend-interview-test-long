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
import UserRenderer from './view/UserRenderer.js';

// for purposes of this, we're always user 5. Otherwise would have another mechanism for getting this id.
const current_user_id = 5;

//sources for our data, load them in async later
const posts_source = new JsonPostStorage( '' );
const users_source = new JsonUserStorage( '' );
// const users_source = new JsonUserStorage('data/users.json');

const post_renderer = new PostRenderer( users_source );

let lightboxTemplate = `<div id="lightbox">
    Post an update:
    <input type="textarea"></input>
    <input type="submit"></input>
<div>`;

let makeLightbox = function () {
    let height = $(document).height();
    let width = $(document).width();
    let $background = $('<div id="lightbox-background">');
    $background.css('width', width);
    $background.css('height', height);

    $background.on( 'click', () => {
        $( '#lightbox-background' ).remove();
    } );

    let $lightbox = $( lightboxTemplate );
    $lightbox.on('click', (evt) => {
        evt.stopPropagation();
    } );
    $background.append( $lightbox );

    return $background;
};

setTimeout( function() {
    posts_source.loadAll().forEach( ( post_data ) => {

        $( '#page' ).append( post_renderer.renderFullPost( post_data ) );

    } );
    let current_user = users_source.loadOne( current_user_id );
    $( '#user-box' ).append( UserRenderer.renderUser( current_user ) );
    $( '#user-pic' ).attr( 'src', current_user.pic );

    $( '#new-post' ).on( 'click', () => {
        $( 'body' ).append( makeLightbox() );
    } );
}, 100 );
