/**
 * 
 */

import {
    Post,
    PostStorageInterface
} from './post.js';

import './../../data/posts.json';

export class JsonPostStorage extends PostStorageInterface {
    /**
     * @param jsonFile path to a json file relative to src/
     *                 (in other words, '..' will be prepended to this arg)
     */
    constructor( jsonFile ) {
        super();

        this.nextId = 1;

        this.allData = [];

        if ( jsonFile ) {
            this.sourceFile = jsonFile;

            // let tmpData = require( '../' + this.sourceFile );
            // let tmpData = require( this.sourceFile );
            // let tmpData = require( './../' + jsonFile );
            let tmpData = require('./../../data/posts.json');

            tmpData.forEach( ( post ) => {
                this.save( Post.fromJson( post ) );
            } );
        }
    }

    /**
     * Load a post.
     *
     * @param postId id of the post to load
     * @return Post || null if no post has id postId
     */
    loadOne( postId ) {
        return this.allData.find( ( post ) => {
            return post.id === postId;
        } );
    }

    /**
     * Return all posts
     *
     * FIXME should have some sort of pagination
     */
    loadAll() {
        return this.allData;
    }

    /**
     * Sorts in place this.allData by date, newest (largest date) first
     */
    sortByDate( posts ) {
        posts.sort( ( a, b ) => {
            return ( b.date - a.date );
            // return (a.date - b.date);
        } );
        return posts;
    }

    /**
     * Checks if a post's id is higher than nextId, and updates nextId if so.
     *
     * @param post Post Will not check comments. Send them through individually.
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
        //if the post id is higher than nextId, update next id
        //if the post has no id, give it one
        //strip out the comments
        //add it to the data structure
        //if the post has any comments, save them all recursively
        
        //if the post has an ID already, and its higher than what we'd give out next
        //set our nextId to one more than the incoming ID
        if ( post.id === undefined ) {
            post.id = this.getNextPostId();
        }
        else {
            this.updateNextIdMaybe( post.id );
        }

        let postComments = post.comments;
        post.comments = [];
        
        //if this is a comment, add to its parent
        if ( parentId ) {
            let parent = this.loadOne( parentId );
            parent.comments.unshift( post );
            parent.comments = this.sortByDate( parent.comments );
        } else {
            //add to the main data source
            this.allData.unshift( post );
            this.allData = this.sortByDate( this.allData );
        }

        if (postComments) {
            postComments.forEach( comment => {
                this.save( comment, post.id );
            } );
        }
        
        return post.id;
    }

    getNextPostId() {
        let ret = this.nextId;
        this.nextId = ret + 1;
        return ret;
    }
}
