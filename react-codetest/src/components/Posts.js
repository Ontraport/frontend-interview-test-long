import React from 'react';
import Comments from './Comments';

function Posts(props) {
  const handleOnEnterKey = e => {
    if (e.key === 'Enter') {
      let newComment = {
        parent: props.post.id,
        userId: 5,
        content: e.target.value
      };
      props.addNewComment(newComment);
      e.target.value = "";
    }
  }

  return (
    <div className="post-item">
      <img className="user-pic" src={props.user.pic} alt="" />
      <div className="post-content-wrapper">
        <div className="post-wrapper">
          <h4 className="post-username">{props.user.username}</h4>
          <p className="post-content">{props.post.content}</p>
        </div>
        <div className="comment-content-wrapper">
          {
            props.post.comments.map((comment, idx) => {
              let userComments = props.allUsers.filter(user => {
                return user.id === comment.userId;
              })
              return (
                <Comments user={userComments[0]} key={idx} comment={comment} />
              );
            })
          }
          <textarea className="comment-textarea" placeholder="post a comment" onKeyPress={handleOnEnterKey}></textarea>
        </div>
      </div>
    </div>
  )
}

export default Posts;