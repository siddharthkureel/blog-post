import React from 'react';
import { connect } from "react-redux";
import { deletePost,fetchSinglePost,editPost } from "../../actions";
class Post extends React.Component{
  state={
    edit:false,
    editedText:'',
    showSaveButton:false
  }
  renderButtons(currentUserId,userId,postId){
    if(currentUserId===userId){
      return <>
      <button onClick={()=>this.props.deletePost(postId)} className="button" style={{ background:'#f44336',padding:'2px 5px' }} >delete</button>
      {(!this.state.showSaveButton)?
      <button onClick={() => this.editHandler(postId)} className="button" style={{ background: 'orange', padding: '2px 5px' }} >
      edit</button>
      :
      <button onClick={() => this.onSubmit(postId)} className="button" style={{ background: 'green', padding: '2px 5px' }} >
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
    const value = (!this.props.editedPost) ? null : this.props.editedPost.post;
    this.setState({
      editedText:value,
      showSaveButton: true
    })
  }
  onSubmit = async (id)=>{
    let dataToSubmit={}
    if(this.state.editedText===''){
      return alert('please enter something')
    }else{
      dataToSubmit.post=this.state.editedText
      dataToSubmit.date=new Date();
      await this.props.editPost(dataToSubmit,id)
      this.setState({
        edit:false,
        showSaveButton:false
      })
    }
  }
  onUpdate(e){
    this.setState({
      editedText:e.target.value
    })

  }
  render(){
    const { name, post, date, userId, postId }=this.props;
    return (
      <div style={styleContent}>
          {(this.state.edit) ?
          <>
            <textarea onChange={(e) => this.onUpdate(e)}  value={this.state.editedText} rows="4" cols="50" style={{ width:'100%' }} /><br/>
          </>
          :<p style={{ fontSize:'20px' }}>{post}</p>
          }
            <span>By:<strong>{name}</strong></span>
            <div style={{ float:'right' }}>
              <span style={{ fontStyle: 'italic' }}>{date}</span>
              <div style={{ float:'right',display:'flex' }} >
              {(this.props.currentUser) ? this.renderButtons(this.props.currentUser.id, userId, postId) : null}
              </div>
            </div>
      </div>
    )
  }
}
const styleContent={
    background:'white',
    color:'black',
    margin:'20px 0px',
    padding:'20px'
}
const mapStateToProps=(state)=>{
  return {
    currentUser: state.signIn.currentUser,
    editedPost:state.fetchSinglePost.post
  }
}
export default connect(mapStateToProps,{deletePost,fetchSinglePost,editPost})(Post);
