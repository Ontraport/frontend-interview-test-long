/**
 * Test for the JSON post storage backend
 */

import {
    JsonPostStorage
} from '../JsonPostStorage.js';

import {
    Post
} from '../post.js';

describe( 'JsonPostStorage', () => {

    var store;

    beforeEach( () => {
        store = new JsonPostStorage( '' );
    } );

    describe( 'saving posts', () => {
        it( 'can save and load post', () => {
            let post = new Post( 1, new Date(), 'test post' );
            let id = store.save( post );
            let loaded = store.loadOne( id );
            expect( loaded.content ).toEqual( post.content );
        } );

        it( 'can save a comment on a post', () => {
            let post = new Post( 1, new Date(), 'test post' );
            let comment = new Post( 1, new Date(), 'test comment' );

            let postId = store.save( post );
            let commentId = store.save( comment, postId );

            let loadedPost = store.loadOne( postId );
            expect( loadedPost.comments.length ).toEqual( 1 );

            let loadedComment = store.loadOne( commentId );
        } );
    } );

    describe( 'getNextPostId', () => {

        beforeEach( () => {
            //make 3 posts
            for ( let i = 0; i < 3; i++ ) {
                let post = new Post( 1, '', 'foobar' );
                store.save( post );
            }
        } );

        it( 'should return a value', () => {
            expect( store.getNextPostId() ).toBeDefined();
        } );

        it( 'should update when a post with a higher id is stored', () => {
            // save a post that's some higher known value
            let post42 = new Post( 1, '', 'sets the id high' );
            post42.id = 42;
            let postId = store.save( post42 );

            let post = new Post( 1, '', 'next id post' );
            let actualId = store.save( post );

            expect( actualId ).toEqual( 43 );
        } );

        it( 'should be used when the post is a comment too', () => {
            let parent = new Post( 1, '', 'post' );

            let comment = new Post(2, '', 'comment');

            let parentId = store.save( parent );
            let commentId = store.save( comment, parentId );
            expect( commentId ).toEqual( parentId + 1 );

            let thirdPostId = store.save( new Post(1, '', '') );

            expect( thirdPostId ).toEqual( commentId + 1 );
        } );

    } );

    describe( 'post ordering', () => {
        it( 'should have newest posts first', () => {
            let newestPost = new Post( 1, new Date(), 'newest' );

            let newDate = new Date();
            newDate.setHours( newDate.getHours() - 1 );
            let newPost = new Post( 1, newDate, 'newer' );

            let oldDate = new Date();
            oldDate.setHours( oldDate.getHours() - 2 );
            let oldPost = new Post( 2, oldDate, 'older' );

            //doing three posts all out of order liks this should prevent us from getting
            //lucky and inserting in a way that a broken backend will look like its working
            store.save( newPost );
            store.save( oldPost );
            store.save( newestPost );

            let allPosts = store.loadAll();
            expect( allPosts[ 0 ].content ).toEqual( 'newest' );
            expect( allPosts[ 1 ].content ).toEqual( 'newer' );
            expect( allPosts[ 2 ].content ).toEqual( 'older' );
        } );

        it( 'should sort comments too', () => {
            let parentPostId = store.save( new Post( 1, new Date(), 'parent' ) );

            let newestComment = new Post( 1, new Date(), 'newest' );

            let newDate = new Date();
            newDate.setHours( newDate.getHours() - 1 );
            let newComment = new Post( 1, newDate, 'newer' );

            let oldDate = new Date();
            oldDate.setHours( oldDate.getHours() - 2 );
            let oldComment = new Post( 2, oldDate, 'older' );

            //doing three posts all out of order liks this should prevent us from getting
            //lucky and inserting in a way that a broken backend will look like its working
            store.save( newComment, parentPostId );
            store.save( oldComment, parentPostId );
            store.save( newestComment, parentPostId );

            let allComments = store.loadOne( parentPostId ).comments;
            expect( allComments[ 0 ].content ).toEqual( 'newest' );
            expect( allComments[ 1 ].content ).toEqual( 'newer' );
            expect( allComments[ 2 ].content ).toEqual( 'older' );

        } );
    } );
} );
