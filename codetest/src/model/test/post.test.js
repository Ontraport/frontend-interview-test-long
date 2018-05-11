/**
 * Test for model/post.js
 */

import * as post from '../post.js';

describe( 'Post', () => {

    //test post, please ignore
    var testPost;

    beforeEach( () => {
        testPost = new post.Post( 4, 1, "whenever", "herp derp" );
    } );

    describe( 'comments', () => {

        var commentPost;

        beforeEach( () => {
            commentPost = new post.Post( 5, 2, "whenever", "delet this" );
            testPost.addComment( commentPost );
        } );

        it( 'should return the newest comments first', () => {
            testPost.addComment( new post.Post( 10, 3, new Date().toString(), "newest" ) );
            let comments = testPost.getComments();
            expect( comments[ 0 ].id ).toBe( 10 );
            expect( comments[ 1 ].id ).not.toBe( 10 );
        } );

        it( 'cant comment on posts that are comments', () => {
            let startingCommentCount = commentPost.getComments().length;
            commentPost.addComment( new post.Post() );
            expect( startingCommentCount ).toBe( commentPost.getComments().length );
        } );

        it( 'should still return an array when the post is a comment itself', () => {
            //make sure we've actually got a comment post
            expect( commentPost.isComment() ).toBeTruthy();

            expect( commentPost.getComments() ).toBeDefined();
            expect( commentPost.getComments() ).not.toBeNull();
        } );

    } );

    describe( 'constructor', () => {
        it( 'can be constructed', () => {
        } );

        it( 'can be loaded from JSON', () => {
            let postJsonString = JSON.stringify(new post.Post(1, 2, "whenever", "testing"));
            
            let loadedPost = post.Post.fromJson( postJsonString );
            expect(loadedPost.id).toBe(1);
            expect(loadedPost.userId).toBe(2);
            expect(loadedPost.date).toBe('whenever');
            expect(loadedPost.content).toBe('testing');
        } );

        it( 'should load comments from JSON', () => {} );

        it( 'should not allow over-nesting of comments when loading from JSON', () => {} );
    } );
} );
