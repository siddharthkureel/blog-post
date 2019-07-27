import React, { Component } from 'react';
import { connect } from "react-redux";
import { likePost } from "../../actions";
class Like extends Component {
    state = {
        like: 'Like',
        list: [],
        toggle: false
    }
    handleLike = async (postId, userId, name) => {
        await this.props.likePost(postId, userId, name)
        this.setState({
            like: 'Liked',
            toggle: true
        })
    }
    componentDidMount(){
        if (this.props.user && this.props.list) {
            console.log(this.props.list)
            this.props.list.forEach(user => {
                if (user.userId === this.props.user.id) {
                    this.setState({
                        like: 'Liked',
                        toggle: true,
                    })
                }
            })
        }
    }
    render() {
        return (
            <>
                <button disabled={this.state.toggle} id='toggle' className="button"
                    onClick={() => this.handleLike(this.props.postId, this.props.user.id, this.props.user.name)}
                >{this.state.like}
                </button>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        like: state.likePost
    }
}
export default connect(mapStateToProps, { likePost})(Like);