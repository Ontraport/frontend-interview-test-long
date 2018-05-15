/**
 * This renders posts and comments
 */

export default class PostRenderer {

    /**
     * 
     */
    constructor( userDataSource ) {
        this.userSource = userDataSource;

        this.postTemplate = `<div class="post_content-container">
        <div class="post_user-pic">
        <img src="" />
        </div>
        <div class="post_user-name">
        </div>
        <div class="post_content">
        </div>
        </div>`;

        this.postContainerTemplate = `<div class="post-container">
        <div class="post_comment-container">
        </div>
        <div class="post_add-comment">
        <input></input>
        </div>
        </div>`;

        this.commentContainerTemplate = '<div class="comment-container"></div>';
    }

    // static postTemplate = '<div class="post_user-pic">' +
    //     '<img src="" />' +
    //     '</div>' +
    //     '<div class="post_user-name">' +
    //     '</div>' +
    //     '<div class="post_content">' +
    //     '</div>';

    /**
     * Render the main content of a post into HTML. Works for posts and comments
     *
     * @param post Post object
     * @return jQuery obj
     */
    renderPostContent( post ) {
        let postUser = this.userSource.loadOne( post.userId );
        let $post = $( this.postTemplate );
        // $post.find('.post_user-pic img').src(postUser.pic);
        $post.find( '.post_user-name' ).append( postUser.username );
        $post.find( '.post_content' ).append( post.content );
        return $post;
    }

    /**
     * Render all the comments
     *
     * @param comments [Post]
     * @return jQuery object
     */
    renderAllComments( comments ) {
        //create a container
        let $commentContainer = $( this.commentContainerTemplate );
        //for each comment
        comments.forEach( ( comment ) => {
            //render post into that container
            $commentContainer.append( this.renderPostContent( comment ) );
        } );
        return $commentContainer;
    }

    /**
     * Render a post, including its comments, and users.
     *
     * @param post Post The post to render.
     * @return jQuery object
     */
    renderFullPost( post ) {
        let $fullPost = $( this.postContainerTemplate );

        debugger;
        $fullPost.find( '.post-container' ).prepend( this.renderPostContent( post ) );
        $fullPost.find( '.post_comment-container' ).append( this.renderAllComments( post.comments ) );
        return $fullPost;
    }

    renderAllPosts( posts ) {
        
    }
}
