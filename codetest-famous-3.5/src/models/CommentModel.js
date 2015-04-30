'use strict'

function CommentModel(userId, postId, content) {
    this.id = null;
    this.userId = userId || null;
    this.postId = postId || null;
    this.date = new Date().toISOString();
    this.content = content || '';
}

module.exports = CommentModel;
