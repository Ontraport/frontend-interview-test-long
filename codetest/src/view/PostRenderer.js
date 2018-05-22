/**
 * This renders posts and their comments
 */

export default class PostRenderer {
    /**
     * construct a new PostRenderer
     *
     * @param userDataSource implements user.js:UserStorageInterface
     */
    constructor( userDataSource ) {
        this.userSource = userDataSource;

        this.classes = {
            postContainer: 'post',
            postBody: 'post__body',
            userPicture: 'post__body--pic',
            userName: 'post__body--user-name',
            postContent: 'post__body--content',
            commentSection: 'post__comments',
            commentPostContainer: 'comment-post',
            addCommentInput: 'post__add-comment',
        };
        
        this.postBodyTemplate = `<div class="${this.classes.postBody}">
                <div class="${this.classes.postBody + '--left'} row-elem">
                    <div class="${this.classes.userPicture}">
                    </div>
                </div>
                <div class="${this.classes.postBody + '--right'} row-elem">
                    <div class="${this.classes.userName}">
                    </div>
                    <div class="${this.classes.postContent}">
                    </div>
                </div>
            </div>`;
        
        this.postContainerTemplate = `<div class="${this.classes.postContainer}">
                <div class="${this.classes.commentSection}">
                    <div class="${this.classes.addCommentInput}">
                        <input placeholder="post a comment"></input>
                    </div>
                </div>
            </div>`;

        this.commentContainerTemplate = `<div class="${this.classes.commentPostContainer}"></div>`;
    }

    /**
     * Render the main content of a post into HTML. Works for posts and comments
     *
     * @param post Post object
     * @param isComment boolean whether this post is a comment
     * @return jQuery obj
     */
    renderPostBody( post ) {
        let postUser = this.userSource.loadOne( post.userId );
        let $post = $( this.postBodyTemplate );
        $post.attr( 'post-id', post.id );

        //no comment section if this is a comment
        // if (isComment) {
            // $post.find( '.' + this.classes.commentSection ).remove();
        // }
        
        //FIXME doesnt like settign src attr
        $post.find( '.' + this.classes.userPicture ).append( '<img src="' + postUser.pic + '" />' );
        // $post.find( '.' + this.classes.userPicture ).attr( 'src', postUser.pic );
        $post.find( '.' + this.classes.userName ).append( postUser.username );
        $post.find( '.' + this.classes.postContent ).append( post.content );
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
            $commentContainer.append( this.renderPostBody( comment, true ) );
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

        $fullPost.prepend( this.renderPostBody( post ) );
        if ( post.comments.length > 0 ) {
            $fullPost.find( '.' + this.classes.commentSection ).prepend( this.renderAllComments( post.comments ) );
        }

        return $fullPost;
    }

    /**
     * This is left for whoever is calling us to handle.
     * They should gather and iterate over what they want rendered.
     */
    renderAllPosts( posts ) {}
}
