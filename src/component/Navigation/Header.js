import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ResponsiveMenu from 'react-responsive-navbar';
import { logoutUser } from "../../actions/index";

class Header extends Component {
  handleLogout=()=>{
    this.props.logoutUser()
  }
  render() {
    return (
      <ResponsiveMenu
        menuOpenButton={<div className="nav-toggle" >Open</div>}
        menuCloseButton={<div className="nav-toggle" >Close</div>}
        changeMenuOn="500px"
        largeMenuClassName="large-menu-classname"
        smallMenuClassName="small-menu-classname"
        menu={
        <ul id="ul" >        
          {(!this.props.currentUser) ? 
            <>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/signin">SignIn</Link></li>
            </>
            :
            <> 
            <li><Link to='/'>{this.props.currentUser.email}</Link></li>
            <li><Link to='/signin'className="logout" onClick={this.handleLogout}>Logout</Link></li>
            <li><Link to="/home">Home</Link></li>
            </>
          }
          <li><Link to="/">Posts</Link></li>
          <li id="logo" ><Link to="/">Postsquare</Link></li>
        </ul>
        }
      />
    )
  }
}
const mapStateToProps=(state)=>{
  return {currentUser:state.signIn.currentUser}
}
export default connect(mapStateToProps,{logoutUser})(Header);
