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
            
        } );
        
        it( 'cant comment on posts that are comments', () => {
            let startingCommentCount = commentPost.getComments().length;
            commentPost.addComment( new post.Post() );
            expect( startingCommentCount ).toBe( commentPost.getComments().length );
        } );

        it( 'should still return an array when the post is a comment itself', () => {
            testPost.getComments();
            commentPost.getComments();
        } );
        
    });
    
    it( 'runs', () => {
        expect(post.testing()).toBe(69);
    } );
} );

