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
     */
    constructor( id, userId, date, content, comments ) {
        //TODO should probably produce an error if you're not putting in the IDs
        this.id = id;
        this.userId = userId;
        //FIXME use current date?
        this.date = date || "";
        this.content = content || "";
        this.comments = comments || [];
    }

    /**
     * Load a post object from a JSON string
     *
     * @param JSON as string
     * @return Post
     */
    static fromJson( json_string ) {
        let json_object = JSON.parse( json_string );
        
        return new Post( json_object.id,
            json_object.userId,
            json_object.date,
            json_object.content,
            json_object.comments );
    }

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
     */
    getComments() {
        return this.comments || [];
    }
}


export class PostStorageInterface {
    /**
     * Load a post.
     *
     * @param postId id of the post to load
     * @return Post || null if no post has id postId
     */
    loadOne(postId) {
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
}
