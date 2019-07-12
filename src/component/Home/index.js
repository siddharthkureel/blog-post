import React, { Component } from 'react'
import { connect } from "react-redux";
import  history  from "../../history";
import { addPost, showPost } from "../../actions";
import PostList from "./PostList";
class index extends Component {
  state={
    textarea:""
  }
  updateForm=(e)=>{
  this.setState({
    textarea:e.target.value
  })
  }
  submitForm=()=>{
    let dataToSubmit={};
    if(this.state.textarea===''){
      this.renderError()
    }else{
       dataToSubmit.post=this.state.textarea;
      if (!this.props.currentUser){
          history.push('/signin')
      } else {
       dataToSubmit.userId=this.props.currentUser.id
       dataToSubmit.name=this.props.currentUser.name
       dataToSubmit.date = new Date();
       this.props.addPost(dataToSubmit)
      }
      this.setState({textarea:''})
    }
  }
  renderError=()=>{
    return alert('Please type something')
  }
  componentDidMount(){
    this.props.showPost()
  }
  render() {
    return (
      <div className="center" >
        <div className="post-area" style={{ width:"60vw" }}>
          <textarea onChange={this.updateForm} value={this.state.textarea} rows="10" style={{ width: "100%", resize: 'none' }} /><br/>
          <button className="button" onClick={this.submitForm} >Add Something</button>
          <PostList posts={this.props.posts} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    currentUser: state.signIn.currentUser,
    posts: state.showPost.posts,
    post:state.addPost
  }
}
export default connect(mapStateToProps, {addPost,showPost})(index);