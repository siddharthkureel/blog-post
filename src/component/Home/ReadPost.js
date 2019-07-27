import React, { Component } from 'react';
import { connect } from "react-redux";
import PostList from "./PostList";
import { showPost } from '../../actions/index';
class ReadPost extends Component {
  componentDidMount(){
    this.props.showPost();
  }
  render() {
    if (!this.props.posts){
      return <div className="lds-dual-ring"></div>
    }
    return (
      <div className="center" >
        <div className="post-wrapper" >
         {!this.props.posts.length ?
         <div>No Posts are posted yet</div>
         :
        <PostList posts={this.props.posts} />
        }
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
