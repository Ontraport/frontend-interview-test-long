import React from 'react';
import Posts from './Posts';

function PostsContainer(props) {

  return (
    <div id="post-container">
      <h2>Updates</h2>
      {props.posts.map((post, idx) => {
        let userPosts = props.users.filter(user => {
          return user.id === post.userId;
        })
        return (
          <Posts addNewComment={props.addNewComment} allUsers={props.users} user={userPosts[0]} key={idx} post={post} />
        );
      })}
    </div>
  )
}

export default PostsContainer;