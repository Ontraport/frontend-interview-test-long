import React, { Component } from 'react';
import User from "./components/User";
import PostsContainer from "./components/PostsContainer";
import Header from "./components/Header";
import userData from './data/users.json';
import postData from './data/posts.json';
import NewPostModal from './components/NewPostModal';
import './myStyles.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: userData,
      posts: postData,
      latestPostId: 0,
      curUser: {},
      postModalOn: false
    }
  }

  componentDidMount() {
    if (window.localStorage.length > 0) {
      // Pulling localStorage if it exists...
      this.setState({latestPostId: JSON.parse(window.localStorage.getItem("latestPostId"))});
      this.setState({posts: JSON.parse(window.localStorage.getItem("posts"))});
      this.setState({users: JSON.parse(window.localStorage.getItem("users"))});
      this.setState({curUser: this.state.users.find(user => user.id === 5)})
    } else {
      // Setting up fresh state since no localStorage exists
      this.state.posts.forEach(post => {
        post.comments.forEach(comment => {
          if (comment.id > this.state.latestPostId) {
            this.setState({latestPostId: comment.id + 1});
          } else if (post.id > this.state.latestPostId) {
            this.setState({latestPostId: post.id + 1});
          }
        });
      });

      this.setState({curUser: this.state.users.find(user => user.id === 5)})

      window.localStorage.setItem('latestPostId', JSON.stringify(this.state.latestPostId));
      window.localStorage.setItem('posts', JSON.stringify(this.state.posts));
      window.localStorage.setItem('users', JSON.stringify(this.state.users));
    }
  }

  componentDidUpdate() {
    window.localStorage.clear();
    window.localStorage.setItem('latestPostId', JSON.stringify(this.state.latestPostId));
    window.localStorage.setItem('posts', JSON.stringify(this.state.posts));
    window.localStorage.setItem('users', JSON.stringify(this.state.users));

    /*
      Here is where a function would run, checking network connections to verify if its
      OK to push the localStorage to the server.
    */
  }

  setPostModalDisplay = (modalState) => {
    this.setState({postModalOn: modalState});
  }

  addNewPost = (post) => {
    let newPost = {
      "id": this.state.latestPostId + 1,
      "userId": post.userId,
      "date": "Today",
      "content": post.content,
      "comments": []
    }

    let finalPostsUpdate = [...this.state.posts, newPost]

    this.setState({posts: finalPostsUpdate});
  }

  addNewComment = (comment) => {
    let newComment = {
      "id": this.state.latestPostId + 1,
      "postId": comment.parent,
      "userId": comment.userId,
      "date": "Today",
      "content": comment.content,
    }

    const newComments = this.state.posts.slice();

    let finalCommentsUpdate = newComments.map(post => {
      if (post.id === newComment.postId) {
        post.comments = [...post.comments, newComment]
      }
      return post;
    })

    this.setState({posts: finalCommentsUpdate});
  }

  render() {
    return (
      <div className="App">
        <NewPostModal setPostModalDisplay={this.setPostModalDisplay} postModalOn={this.state.postModalOn} addNewPost={this.addNewPost} user={this.state.users} />
        <Header setPostModalDisplay={this.setPostModalDisplay} postModalOn={this.state.postModalOn} curUser={this.state.curUser} />

        <div id="main">
          <User curUser={this.state.curUser} user={this.state.users} />
          <PostsContainer users={this.state.users} posts={this.state.posts} addNewComment={this.addNewComment} />

          <footer>
            <p>This is a footer mesage</p>
          </footer>
        </div>

      </div>
    );
  }
}

export default App;
