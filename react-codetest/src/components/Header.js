import React from 'react'

function Header(props) {
  const handleNewPostClick = (e) => {
    props.setPostModalDisplay(true);
  }

  return(
    <div id="header">
      <div id="logo">
        <img src="images/logo.png" alt="the network"/>
      </div>
      <div id="search">
        <form method="get" action="#">
          <input type="search" name="terms" placeholder="Search...."/>
          <input type="submit" value="Go"/>
        </form>
      </div>
      <div className="header-nav">
        <a href="/">Home</a>
        <button className="new-post-button" onClick={handleNewPostClick} >Post an update</button>
        <img className="header-user-pic" src={props.curUser.pic} alt="" />
      </div>
    </div>
  )
}

export default Header;