/**
 * user.js - model class for the user object
 */

export class User {
    /**
     * Build a new user object
     * 
     * @param id int 
     * @param username string
     * @param pic path-to-file as string
     * @about string
     */
    constructor (/*id,*/ username, pic, about) {
        // this.id = id;
        this.username = username;
        this.pic = pic;
        this.about = about;
    }

    static fromJson( jsonObject ) {
        let user =  new User( jsonObject.username,
                              jsonObject.pic,
                              jsonObject.about );
        //since the ID isnt part of the constructor, but we should
        //have one in the JSON, set it here
        user.id = jsonObject.id;
        return user;
    }

    /**
     * Set the picture for a user
     *
     * @param url url of the photo to use
     */
    setPic(url) {
        //TODO check if url is valid
        this.pic = url;
    }
}

export class UserStorageInterface {
    constructor() {}

    loadOne(userId) {
        return;
    }

    loadAll() {
        return;
    }
}
