import React from 'react';
import { connect } from "react-redux";
import { deletePost,fetchSinglePost,editPost,likePost,renderLikes } from "../../actions";
class Post extends React.Component{
  state={
    edit:false,
    editedText:'',
    editedTitle:'',
    like:'Like',
    count:0,
    list:[],
    toggle:false,
    showSaveButton:false
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
  componentDidMount=async ()=>{
    if (this.props.postId) {
      await this.props.renderLikes(this.props.postId)
    }
    if (this.props.readLike) {
      const count = this.props.readLike.users.length;
      this.setState({
        count,
        list:[...this.props.readLike.users]
      });
    }
    if (this.props.currentUser && this.props.readLike) {
      this.props.readLike.users.forEach(user => {
        if (user.userId === this.props.currentUser.id) {
          this.setState({
            like: 'liked',
            toggle: true,
          })
        }
      })
    } 
  }
  updateTextArea=(e)=>this.setState({editedText:e.target.value})
  updateTitle = (e) => this.setState({ editedTitle: e.target.value })
  handleLike = async(postId, userId, name)=>{
    await this.props.likePost(postId, userId, name)
    const count = this.state.count + 1
    this.setState({
      like:'Liked',
      toggle:true,
      count:count
    })
  }
  render(){
    const { name, post,title, date, userId, postId }=this.props;
    const toggle = !this.props.currentUser ? true : false ;
    return (
      <div style={styleContent}>
          {(this.state.edit) ?
          <>
            <input className="title-box" onChange={ this.updateTitle} value={this.state.editedTitle} rows="10" style={{ width: '100%' }} />
            <textarea className="post-box" onChange={this.updateTextArea}  value={this.state.editedText} rows="10"  style={{ width:'100%' }} /><br/>
          </>
          :<div>
            <h4 className="title" >{title}</h4>
            <p style={{ fontSize:'20px' }}>{post}</p>
            </div>
          }
            <span>By:<strong>{name}</strong></span>
            <div>
              <span style={{ fontStyle: 'italic' }}>{date}</span>
              <div className="modify-buttons" >
                  <span  className="like-count"> {this.state.count}&nbsp;people</span>
                  <button disabled={toggle || this.state.toggle} id='toggle' className="button" 
                    onClick={this.props.currentUser ? ()=>this.handleLike(postId, this.props.currentUser.id, name) : null}
                   >{this.state.like} 
                  </button>
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
    readLike: state.renderLikes.readLike,
    like:state.likePost,
    currentUser: state.signIn.currentUser,
    editedPost:state.fetchSinglePost
  }
}
export default connect(mapStateToProps,{deletePost,fetchSinglePost,editPost,likePost,renderLikes})(Post);
