import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
export default (ChildComponent) => {
    class ParentComponent extends React.Component{
        
        render(){
            if (this.props.currentUser){
            return <ChildComponent {...this.props} user={this.props.currentUser}/>
            } else 
            return <Redirect to="/signin"/>
        }
    }
    const mapStateToProps = (state) => {
        return { currentUser: state.signIn.currentUser }
    }
    return connect(mapStateToProps)(ParentComponent);
}