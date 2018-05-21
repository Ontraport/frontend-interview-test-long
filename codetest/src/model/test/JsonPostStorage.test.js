/**
 * Test for the JSON post storage backend
 */

import {JsonPostStorage} from '../JsonPostStorage.js';

import {Post} from '../post.js';

describe( 'JsonPostStorage', () => {

    // describe( '
    
    describe( 'getNextPostId', () => {

        var store;

        beforeAll( () => {
            store = new JsonPostStorage('');            
        } );
        
        beforeEach( () => {
            //make 3 posts
            for( let i = 0; i < 3; i++ ) {
                let post = new Post(1, "", "foobar");
                store.save(post);
            }            
        } );
        
        it( 'should update when a post with a higher id is stored', () => {
            // save a post that's some higher known value

            expect(store.getNextPostId()).toBeDefined();
            
            let post42 = new Post(1, "", "sets the id high");
            post42.id = 42;
            let postId = store.save(post42);

            let post = new Post(1, "", "next id post");
            let actualId = store.save(post);

            expect(actualId).toEqual(43);
            
        } );
    } );
} );
