import React from "react";
import { connect } from "react-redux";
import { loadUser } from '../../actions/index';
export default (ChildComponent) => {
    class ParentComponent extends React.Component{
        state={
            loading:true
        }
        async componentDidMount(){
            await this.props.loadUser()
            if(this.props.currentUser){
                this.setState({loading:false})
            }
        }
        render(){
            if (this.state.loading){
            return <div className="lds-dual-ring"></div>
            } else 
            return <ChildComponent {...this.props} user={this.props.currentUser} />
        }
    }
    const mapStateToProps = (state) => {
        return { currentUser: state.signIn.currentUser }
    }
    return connect(mapStateToProps,{loadUser})(ParentComponent);
}