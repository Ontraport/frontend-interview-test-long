import React from 'react';


function User(props) {
  return (
    <div className="current-user-card">
      <img className="user-pic" src={props.curUser.pic} alt={props.curUser.username}/>
      _{props.curUser.username ? props.curUser.username : "" }
    </div>
  );
}


export default User;