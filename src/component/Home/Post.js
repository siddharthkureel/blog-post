import React from 'react';
import { connect } from "react-redux";
import LikeComment from "./LikeComment";
import LinesEllipsis from 'react-lines-ellipsis';
import { deletePost,fetchSinglePost,editPost } from "../../actions";
class Post extends React.Component{
  state={
    edit:false,
    editedText:'',
    editedTitle:'',
    showSaveButton:false,
    read:'more',
    maxLines:3
  }
  renderButtons(currentUserId,userId,postId){
    if(currentUserId===userId){
      return <>
      <button onClick={()=>this.props.deletePost(postId)} className="button" style={{ background:'#f44336',padding:'10px 10px' }} >delete</button>
      {(!this.state.showSaveButton)?
      <button onClick={() => this.editHandler(postId)} className="button" style={{ background: 'orange', padding: '10px 18px' }} >
      edit</button>
      :
      <button onClick={() => this.onSubmit(postId)} className="button" style={{ background: 'green', padding: '10px 18px' }} >
        save</button>
      }
      </>
    }else{
      return null
    }
  }
  editHandler = async (postId) =>{
    this.setState({
      edit:true
    })
    await this.props.fetchSinglePost(postId)
    if(this.props.editedPost){
      this.setState({
        editedTitle:this.props.editedPost.post.title,
        editedText: this.props.editedPost.post.post,
        showSaveButton: true
      })
    }
  }
  onSubmit = async (id)=>{
    let dataToSubmit={}
    if(this.state.editedText===''||this.state.editTitle===''){
      return alert('please enter something')
    }else{
      dataToSubmit.post=this.state.editedText;
      dataToSubmit.title=this.state.editedTitle;
      await this.props.editPost(dataToSubmit,id)
      this.setState({
        edit:false,
        showSaveButton:false
      })
    }
  }
  
  updateTextArea=(e)=>this.setState({editedText:e.target.value})
  updateTitle = (e) => this.setState({ editedTitle: e.target.value })
  handleReadMore=()=>{
     if(this.state.read==='more'){
       return this.setState({ maxLines:10000 })
     }
  }
  render(){
    const { name, post,title, date, userId, postId }=this.props;
    const getDate = date.split('T');
    return (
      <div className="post-area">
          {(this.state.edit) ?
          <div>
            <input className="title-box" onChange={ this.updateTitle} value={this.state.editedTitle} rows="10" style={{ width: '100%' }} />
            <textarea className="post-box" onChange={this.updateTextArea}  value={this.state.editedText} rows="10"  style={{ width:'100%' }} /><br/>
          </div>
          : <div>
            <h1 className="title" >{title}</h1>
            
            <p className="post-body">
              <LinesEllipsis
                text={post}
                maxLine={this.state.maxLines}
                ellipsis={(<a href='#' onClick={this.handleReadMore}>...read {this.state.read}</a>)}
                trimRight
                basedOn='letters'
                onReflow={this.handleReflow}
              /></p>
            </div>
          }
            <span>By:<strong>{name}</strong></span>
            <div>
          <span style={{ fontStyle: 'italic' }}>{getDate[0]}</span>
              <div className="modify-buttons" >
                  <LikeComment user={this.props.currentUser} postId={postId}/>
                  {(this.props.currentUser) ? this.renderButtons(this.props.currentUser.id, userId, postId) : null}
              </div>
            </div>
      </div>
    )
  }
}
const mapStateToProps=(state)=>{
  return {
    currentUser: state.signIn.currentUser,
    editedPost:state.fetchSinglePost
  }
}
export default connect(mapStateToProps,{deletePost,fetchSinglePost,editPost})(Post);
