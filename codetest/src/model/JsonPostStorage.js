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
     * Save a post.
     *
     * @param post Post object to save.
     * @param parentId optional, ID of post that this is a comment on.
     */
    save( post, parentId ) {
        //if the post has an ID already, and its higher than what we'd give out next
        //set our nextId to one more than the incoming ID
        if ( post.id && ( post.id > this.nextId ) ) {
            this.nextId = post.id + 1;
        }
        if ( post.id === undefined ) {
            post.id = this.getNextPostId();
        }
        if ( parentId ) {
            let parent = this.loadOne( parentId );
            parent.comments.unshift( post );
            parent.comments = this.sortByDate( parent.comments );
        } else {
            this.allData.unshift( post );
            this.allData = this.sortByDate( this.allData );
        }
        return post.id;
    }

    getNextPostId() {
        let ret = this.nextId;
        this.nextId = ret + 1;
        return ret;
    }
}
