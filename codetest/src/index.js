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
    <div class="lightbox__header">
    Post an update:
    </div>
    <div class="lightbox__post-content">
    <textarea class="lightbox__post-content__input"></textarea>
    </div>
    <div class="lightbox__submit-button">
    <input type="submit"></input>
    </div>
</div>`;

let makeLightbox = function ( submit_action ) {
    let height = $(document).height();
    let width = $(document).width();
    let $background = $('<div id="lightbox-background">');
    $background.css('width', width);
    $background.css('height', height);

    let closeLightbox = () => {
        $( '#lightbox-background' ).remove();
    };
    
    $background.on( 'click', closeLightbox);

    let $lightbox = $( lightboxTemplate );

    //dont let the click event propagate out, or itll close the box
    $lightbox.on('click', (evt) => {
        evt.stopPropagation();
    } );

    $lightbox.find( '.lightbox__submit-button' ).on('click', () => {
        submit_action( $( '.lightbox__post-content__input' ).val() );
        closeLightbox();
    } );
    
    $background.append( $lightbox );

    return $background;
};

let renderPosts = function ( posts ) {
    $('#page > div').remove();
    posts_source.loadAll().forEach( ( post_data ) => {
        $( '#page' ).append( post_renderer.renderFullPost( post_data ) );
    } );    
};

setTimeout( function() {
    // render the page
    renderPosts();
    
    let current_user = users_source.loadOne( current_user_id );
    $( '#user-box' ).append( UserRenderer.renderUser( current_user ) );
    $( '#user-pic' ).attr( 'src', current_user.pic );

    let make_new_post = function( content ) {
        posts_source.save( new Post( posts_source.getNextPostId(),
                                     current_user_id,
                                     'right now',
                                     content ) );
        //render the posts
        renderPosts();
    };

    $( '#new-post' ).on( 'click', () => {
        $( 'body' ).append( makeLightbox( make_new_post ) );
    } );
}, 0 );
