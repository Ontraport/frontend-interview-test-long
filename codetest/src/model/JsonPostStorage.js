/**
 * 
 */

import {Post, PostStorageInterface} from './post.js';

export class JsonPostStorage extends PostStorageInterface {
    constructor( jsonFile ) {
        super();

        this.nextId = 1;
        
        this.sourceFile = jsonFile;
        // this.allData = this.sourceFile;
        // TODO load the freakin file in here
        
        let tmpData = [ {
                "id": 1,
                "userId": 1,
                "date": "unknown",
                "content": "Love wine? Love food? Love to win an iPad 2 with gift certificates to your favorite IA winery & Dine IA restaurant. https://bit.ly/IqT6zt",
                "comments": [ {
                        "id": 13,
                        "postId": 1,
                        "userId": 3,
                        "date": "",
                        "content": "Would you happen to know were Capone is? Since you are a secret agent and all"
                    }
                ]
            },
            {
                "id": 2,
                "userId": 3,
                "date": "just now",
                "content": "Day 2 of house sitting...awww my firends really do Trust me!",
                "comments": []
            }
                      ];

        this.allData = [];
        tmpData.forEach( (post) => {
            this.save( Post.fromJson( post ) );
        } );
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
    loadAll( ) {
        return this.allData;
    }

    save( post ) {
        debugger;
        if ( post.id && ( post.id > this.nextId ) ) {
            this.nextId = post.id + 1;
        }
        if ( post.id === undefined ) {
            post.id = this.nextId;
            this.nextId += 1;
        }
        this.allData.unshift(post);
        return post.id;
    }

    getNextPostId() {
        let ret = this.nextId;
        this.nextId = ret + 1;
        return ret;
    }
}
