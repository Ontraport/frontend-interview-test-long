/**
 * Test for model/user.js
 *
 * Looks like User isnt actually gonna do much beyond be a data class
 */

import * as user from '../user.js';

describe( 'User', () => {

    it( 'should construct', () => {
        let newUser = new user.User(1, 'tester', '', 'just a test');
        expect(newUser.id).toEqual(1);
        expect(newUser.username).toEqual('tester');
        expect(newUser.pic).toEqual('');
        expect(newUser.about).toEqual('just a test');
    } );
    
} );
