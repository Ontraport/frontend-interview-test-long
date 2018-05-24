/**
 * Lightbox.js - holds all the code for popping up the "new post" lightbox.
 */

const classes = {
    header: 'lightbox__header',
    inputWrapper: 'lightbox__post-content',
    submit: 'lightbox__submit-button'
};

const lightboxTemplate = `<div id="lightbox">
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

/**
 * Create a new lightbox that will call submit_action(String) when the submit
 * button is clicked.
 *
 * Clicking outside the content will close the lightbox.
 *
 * @param submit_action callback function taking a single string arg
 * @return jQuery object
 */
export const makeLightbox = ( submit_action ) => {
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

    //dont let the click event propagate out, or it will close the box
    $lightbox.on('click', (evt) => {
        evt.stopPropagation();
    } );

    // submission event handler
    $lightbox.find( '.lightbox__submit-button' ).on('click', () => {
        submit_action( $( '.lightbox__post-content__input' ).val() );
        closeLightbox();
    } );
    
    $background.append( $lightbox );

    return $background;
};
