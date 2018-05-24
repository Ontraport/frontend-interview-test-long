/**
 * A storage layer to store posts as regular JS objects
 */

import {
    Post,
    PostStorageInterface
} from './post.js';

export class JsonPostStorage extends PostStorageInterface {
    /**
     * @param jsonFile path to a json file relative to src/
     */
    constructor( jsonFile ) {
        super();

        this.nextId = 1;

        this.allData = [];

        if ( jsonFile ) {
            this.sourceFile = jsonFile;

            //this path in finnicky... there may be a better way somehow.
            let tmpData = require(`./../../data/${ jsonFile }`);

            tmpData.forEach( ( post ) => {
                this.save( Post.fromJson( post ) );
            } );
        }
    }

    /**
     * Load a post.
     *
     * @param postId id of the post to load
     * @return Post || undefined if no post has id postId
     */
    loadOne( postId ) {
        return this.allData.find( ( post ) => {
            return post.id === postId;
        } );
    }

    /**
     * Return all posts
     *
     * TODO should have some sort of pagination
     */
    loadAll() {
        return this.allData;
    }

    /**
     * Sorts in place this.allData by date, newest (largest date) first
     */
    sortByDate( posts, comments ) {
        posts.sort( ( a, b ) => {
            if( comments ) {
                return (a.date - b.date);
            }
            else {
                return ( b.date - a.date );
            }
        } );
        return posts;
    }

    /**
     * Checks if a post's id is higher than nextId, and updates nextId if so.
     * This will not check through the post's comments!
     *
     * @param idNumber int
     */
    updateNextIdMaybe ( idNumber ) {
        if( idNumber > this.nextId ) {
            this.nextId = idNumber + 1;
        }
    }

    /**
     * Save a post.
     *
     * @param post Post object to save.
     * @param parentId optional, ID of post that this is a comment on.
     */
    save( post, parentId ) {       
        //if the post has an ID already, and its higher than what we'd give out next
        //set our nextId to one more than the incoming ID
        if ( post.id === undefined ) {
            post.id = this.getNextPostId();
        }
        else {
            this.updateNextIdMaybe( post.id );
        }

        //strip out the comments, they get added separately after the main post
        //because comments use the same key (id) as primary posts, comments need to be handled one-by-one as full-on posts
        let postComments = post.comments;
        post.comments = [];
        
        //if this is a comment, add to its parent
        if ( parentId ) {
            let parent = this.loadOne( parentId );
            parent.comments.unshift( post );
            parent.comments = this.sortByDate( parent.comments, true );
        } else {
            //add to the main data source
            this.allData.unshift( post );
            this.allData = this.sortByDate( this.allData );
        }

        //if the post has any comments, save them all recursively
        if (postComments) {
            postComments.forEach( comment => {
                this.save( comment, post.id );
            } );
        }

        //return the id of the main post, not its comments. The main post's id can be used to fetch its comments
        //and then get their IDs
        return post.id;
    }

    /**
     * Get an id to assign to a post, and increment the internal refrence of what id should be next.
     */
    getNextPostId() {
        let ret = this.nextId;
        this.nextId = ret + 1;
        return ret;
    }
}
