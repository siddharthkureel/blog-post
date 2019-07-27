import React, { Component } from 'react';
import { connect } from "react-redux";
import { likePost, renderLikes } from "../../actions";
class LikeComment extends Component {
    state = {
        like: 'Like',
        count: 0,
        list: [],
        toggle: false
    }
    async componentDidMount(){
        await this.props.renderLikes(this.props.postId);
        if(this.props.readLike){
            this.setState({
                count:this.props.readLike.users.length,
                list:this.props.readLike
            })    
        }  
        if (this.props.user && this.props.readLike) {
            this.props.readLike.users.forEach(user => {
                if (user.userId === this.props.user.id) {
                    this.setState({
                        like: 'liked',
                        toggle: true,
                    })
                }
            })
        }
    }
    handleLike = async (postId, userId, name) => {
        await this.props.likePost(postId, userId, name)
        const count = this.state.count + 1
        this.setState({
            like: 'Liked',
            toggle: true,
            count: count
        })
    }
    render() {
        return (
            <div>
                <span className="like-count"> {this.state.count}&nbsp;Likes</span>
                {this.props.user===undefined ? 
                null:
                <button disabled={this.state.toggle} id='toggle' className="button"
                onClick={() => this.handleLike(this.props.postId, this.props.user.id, this.props.user.name)}
                >{this.state.like}
                </button>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        readLike: state.renderLikes.readLike,
        like: state.likePost
    }
}
export default connect(mapStateToProps, { likePost, renderLikes })(LikeComment);