'use strict'

function PostModel(userId, content) {
    this.id = null;
    this.userId = userId || null;
    this.date = new Date().toISOString();
    this.content = content || '';
    this.comments = [];
}

module.exports = PostModel;
