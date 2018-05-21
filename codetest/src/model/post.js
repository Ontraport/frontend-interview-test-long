/**
 * post.js - model class for posts
 */

/**
 * Repsesents a post in the app.
 *
 * Comments are only allowed to go 1 level/thread deep.
 * Post#comments will be set to null if this post is a comment.
 * 
 */
export class Post {
    /**
     * Build a new post object.
     * 
     * @param id int
     * @param userId int
     * @param date string
     * @param content string
     * @param comments [Post] || null
     *
     * TODO I think it would be better for this if date came after content
     * that way you could have date and comments both be optional args.
     * Would require changing all uses of this though.
     */
    constructor( /*id,*/ userId, date, content, comments ) {
        // this.id = id;
        this.userId = userId;
        //FIXME use current date?
        this.date = date || "";
        this.content = content || "";
        this.comments = comments || [];
    }

    /**
     * Load a post object from a JSON string
     *
     * @param jsonObject JSON parsed into an object
     * @return Post
     */
    static fromJson( jsonObject ) {
        //make the post, leave out comments for now
        let post = new Post( jsonObject.userId,
            jsonObject.date,
            jsonObject.content );

        if ( jsonObject.comments ) {
            jsonObject.comments.forEach( ( comment ) => {
                post.addComment( this.fromJson( comment ) );
            } );
        }

        post.id = jsonObject.id;

        return post;
    }

    /**
     * Check if this post is a comment. Used to determine whether comments
     * can be added to this post.
     *
     * @return boolean
     */
    isComment() {
        return ( this.comments === null );
    }

    /**
     * Add a comment to this post.
     *
     * @param commentPost a Post object representing the comment
     * @return none
     */
    addComment( commentPost ) {
        if ( this.isComment() ) {
            return;
        }

        commentPost.comments = null;
        this.comments.unshift( commentPost );
    }

    /**
     * Get the comments on a post.
     *
     * @return [Post]
     */
    getComments() {
        return this.comments || [];
    }
}

/**
 * Represents the requirements for any storage layer handling posts.
 *
 * Extend this when implementing something that stores posts.
 *
 * (note to self: this is probably not a very JS way to do things)
 */
export class PostStorageInterface {
    /**
     * Load a post.
     *
     * @param postId id of the post to load
     * @return Post || null if no post has id post
     */
    constructor() {}

    loadOne( postId ) {
        return;
    }

    /**
     * Return all posts
     *
     * FIXME should have some sort of pagination
     */
    loadAll() {
        return;
    }

    /**
     * Save a post
     *
     * @return the id of the saved post
     */
    save( post ) {
        return;
    }

    getNextPostId() {
        return 0;
    }
}
