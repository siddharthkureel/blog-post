import React from 'react'
import HeaderNav from './../Navigation/Header';
import FooterNav from '../Navigation/Footer';
const Layout = (props) => {
  return (
    <React.Fragment>
          <div className="body-wrapper" >
              <HeaderNav />
              {props.children}
              <div className="push"></div>
          </div>
          <FooterNav/>
    </React.Fragment>
  )
}

export default Layout;
