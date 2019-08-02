import React, { Component } from 'react';
import { connect } from "react-redux";
import PostList from "./PostList";
import { showPost, loadUser } from '../../actions/index';
class ReadPost extends Component {
  async componentDidMount(){
    await this.props.loadUser()
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
export default connect(mapStateToProps,{showPost, loadUser})(ReadPost);
