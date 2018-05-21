/**
 * Test for model/post.js
 */

import {Post} from '../post.js';

describe( 'Post', () => {

    //test post, please ignore
    var testPost;

    beforeEach( () => {
        testPost = new Post( 1, "whenever", "herp derp" );
    } );

    describe( 'comments', () => {

        var commentPost;

        beforeEach( () => {
            commentPost = new Post( 2, "whenever", "delet this" );
            testPost.addComment( commentPost );
        } );

        it( 'should return the newest comments first', () => {
            let newerComment = new Post( 10, new Date().toString(), "newest" );
            testPost.addComment( newerComment );
            let comments = testPost.getComments();
            expect( comments[ 0 ].userId ).toBe( 10 );
            expect( comments[ 1 ].userId ).not.toBe( 10 );
        } );

        it( 'cant comment on posts that are comments', () => {
            let startingCommentCount = commentPost.getComments().length;
            commentPost.addComment( new Post() );
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

        it( 'can be loaded from JSON', () => {
            let postJsonString = JSON.stringify( new Post( 3, "whenever", "testing" ) );

            let loadedPost = Post.fromJson( JSON.parse( postJsonString ) );
            // expect(loadedPost.id).toBe(1);
            expect( loadedPost.userId ).toBe( 3 );
            expect( loadedPost.date ).toBe( 'whenever' );
            expect( loadedPost.content ).toBe( 'testing' );
        } );

        it( 'should load comments from JSON', () => {
            let json = {
                "id": 1,
                "userId": 1,
                "date": "",
                "content": "main post",
                "comments": [ {
                    "id": 2,
                    "postId": 1,
                    "userId": 2,
                    "date": "",
                    "content": "comment"
                } ]
            };

            let loadedPost = Post.fromJson( json );
            expect( loadedPost.comments.length ).toEqual( 1 );
            expect( loadedPost.comments[ 0 ] instanceof Post ).toBeTruthy();
        } );

        it( 'should not allow over-nesting of comments when loading from JSON', () => {
            let json = {
                "id": 1,
                "userId": 1,
                "date": "",
                "content": "main post",
                "comments": [ {
                    "id": 2,
                    "postId": 1,
                    "userId": 2,
                    "date": "",
                    "content": "level 1 comment",
                    "comments": [ {
                        "id": 3,
                        "postId": 2,
                        "userId": 3,
                        "date": "",
                        "content": "level 2 comment"
                    } ]
                } ]
            };

            let loadedPost = Post.fromJson( json );
            expect( loadedPost.comments.length ).toEqual( 1 );
            expect( loadedPost.comments[ 0 ].comments ).toBeNull();
        } );
    } );
} );
