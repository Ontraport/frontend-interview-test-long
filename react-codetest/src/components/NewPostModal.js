import React from 'react'

function NewPostModal(props) {
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      let addPost = {
        userId: 5,
        content: e.target.value
      }
      props.addNewPost(addPost);
      e.target.value = '';
      props.setPostModalDisplay(false);
    }
  }

  return (
    <div id="post-modal-wrapper" style={props.postModalOn ? {display: "flex"} : {display: "none"}}>
      <div className="post-modal">
        <h3 className="post-modal-header">Status Update</h3>
        <textarea className="post-modal-textarea" placeholder="whats on your mind" onKeyPress={handleKeyPress}></textarea>
        <p className="post-modal-info">hit enter to post</p>
      </div>
    </div>
  );
}

export default NewPostModal;