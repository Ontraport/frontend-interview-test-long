/**
 * Test for model/post.js
 */

import * as post from '../post.js';

describe( 'Posts', () => {

    //test post, please ignore
    var testPost;
    
    beforeEach( () => {
        testPost = new post.Post(4, 1, "whenever", "herp derp");
    } );
    
    describe( 'comments', () => {

        var commentPost;

        beforeEach( () => {
            commentPost = new post.Post(5, 2, "whenever", "delet this");
            testPost.addComment(commentPost);
        } );

        it( 'should return the newest comments first', () => {
            testPost.addComment(10, 3, new Date().toString(), "newest");
            let comments = testPost.getComments();
            expect( comments[0].id ).toBe(10);
            expect( comments[1].id ).not.toBe(10);
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
        
    });
    
    it( 'runs', () => {
        expect(post.testing()).toBe(69);
    } );
} );

