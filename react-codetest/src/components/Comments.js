import React from 'react'

function Comments(props) {
  return (
    <div>
      <div className="comment-wrapper">
        {
          props.user.id === 5 ?
          <a href="/">
            <img className="comment-user-pic" src={props.user.pic} alt="" />
          </a> :
          <img className="comment-user-pic" src={props.user.pic} alt="" />
        }
        <div className="comment-content">
          <div className="comment-header">
            <h4 className="post-username">{props.user.username}</h4>
            <span className="comment-date">{props.comment.date}</span>
          </div>
          <p className="post-content">{props.comment.content}</p>
        </div>
      </div>
    </div>
  )
}

export default Comments;