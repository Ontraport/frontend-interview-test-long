/**
 * JsonUserStorage.js - Store Users as JS objects
 *
 * FIXME abstract this and JsonPostStorage with a JsonStorage superclass.
 * Way to much duplicate functionality.
 */

import {
    UserStorageInterface,
    User
} from './user.js';

export class JsonUserStorage extends UserStorageInterface {
    /**
     * @param jsonFile path to a json file relative to src/
     *                 (in other words, '..' will be prepended to this arg)
     */    
    constructor( jsonFile ) {
        super();

        this.nextId = 1;

        this.allData = [];
        
        //TODO actually load data
        if (jsonFile) {
            this.sourceFile = jsonFile;

            // let tmpData = require( jsonFile );
            let tmpData = require(  `./../../data/${ jsonFile }` );

            tmpData.forEach( ( post ) => {
                this.save( User.fromJson( post ) );
            } );
        }
    }

    getNextId() {
        return this.nextId++;
    }

    save( user ) {
        if ( user.id && ( user.id > this.nextId ) ) {
            this.nextId = user.id + 1;
        }
        if ( user.id === undefined ) {
            user.id = this.getNextId();
        }
        this.allData.unshift( user );
        return user.id
    }

    loadOne( userId ) {
        return this.allData.find( (user) => {
            return user.id === userId;
        } );
    }

    loadAll() {
        return this.allData;
    }
}
