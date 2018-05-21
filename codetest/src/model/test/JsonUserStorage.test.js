/**
 * Test the user storage layer
 */

import {JsonUserStorage} from '../JsonUserStorage.js';
import {User} from '../user.js';

describe( 'JsonUserStorage', () => {

    var store;

    beforeEach( () => {
        store = new JsonUserStorage();
    } );

    describe( 'saving users', () => {
        it( 'can save and load', () => {
            let user = new User('tester', '', 'about');
            let id = store.save(user);
            let loadedUser = store.loadOne(id);
            expect(loadedUser.name).toEqual(user.name);
            expect(loadedUser.id).toBeDefined();
        } );
        
        it( 'should update nextId when a user is saved with a higher id', () => {
            
        } );
    } );
    
} );
