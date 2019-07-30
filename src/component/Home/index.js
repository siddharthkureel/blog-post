import React, { Component } from 'react'
import { connect } from "react-redux";
import  history  from "../../history";
import { addPost, showPost } from "../../actions";
import PostList from "./PostList";
class index extends Component {
  state={
    title:"",
    textarea:""
  }
  updateTextArea=(e)=>this.setState({textarea:e.target.value})
  updateTitle=(e)=>this.setState({title:e.target.value})
  submitForm=()=>{
    let dataToSubmit={};
    if(this.state.textarea===''|| this.state.title===''){
      this.renderError()
    }else{
       dataToSubmit.post=this.state.textarea;
       dataToSubmit.title= this.state.title;
      if (!this.props.user){
          history.push('/signin')
      } else {
       dataToSubmit.userId=this.props.user.id
       dataToSubmit.name=this.props.user.name
       dataToSubmit.date = new Date().toDateString();
       this.props.addPost(dataToSubmit)
      }
      this.setState({textarea:'',title:''})
    }
  }
  renderError=()=>{
    return alert('Both fields are required, Please type something')
  }
  componentDidMount(){
    this.props.showPost()
  }
  renderUserPosts = ()=>{
    let posts = [];
    const id = !this.props.user ? null :this.props.user.id
    if(this.props.posts ){
      posts = this.props.posts.filter(post=>post.userId===id)
    }
    return posts
  }
  render() {
    return (
      <div className="center" >
        <div className="post-wrapper" >
          <div className="post-area">
            <input className="title-box"  onChange={this.updateTitle} value={this.state.title} placeholder="Please enter Title"/>
            <textarea className="post-box" onChange={this.updateTextArea} value={this.state.textarea} placeholder="Please enter Body" rows="10" /><br/>
            <button className="button" onClick={this.submitForm} >Add Something</button>
          </div>
          <PostList posts={this.renderUserPosts() }  />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    posts: state.showPost.posts,
    post:state.addPost
  }
}
export default connect(mapStateToProps, {addPost,showPost})(index);