'use strict'

function UserModel(id, info) {
	info = info || {};

    this.id = id || null;
    this.username = info.username || '';
    this.pic = info.pic || '';
    this.about = info.about || '';
}

module.exports = UserModel;
