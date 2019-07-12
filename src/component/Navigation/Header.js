import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class Header extends Component {
  render() {
    return (
      <ul id="ul">
        {(!this.props.currentUser) ? 
          <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/signin">SignIn</Link></li>
          </>
          :
          <> 
          <li><Link to='/'>{this.props.currentUser.email}</Link></li>
          <li><a href="/">Logout</a></li>
          </>
        }
        <li><Link to="/">Home</Link></li>
      </ul>
    )
  }
}
const mapStateToProps=(state)=>{
  
  return {currentUser:state.signIn.currentUser}
}
export default connect(mapStateToProps,null)(Header);
