import React, { Component } from 'react';
import { connect } from "react-redux";
import PostList from "./PostList";
import { showPost } from '../../actions/index';
class ReadPost extends Component {
  componentDidMount(){
    this.props.showPost();
  }
  render() {
    return (
      <div className="center" >
        <div className="post-area" style={{ width: "60vw" }} >
        <PostList posts={this.props.posts} />
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state)=>{
  return {
    posts: state.showPost.posts
  }
}
export default connect(mapStateToProps,{showPost})(ReadPost);
