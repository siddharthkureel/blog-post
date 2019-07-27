import React from 'react'
import HeaderNav from './../Navigation/Header';
import FooterNav from '../Navigation/Footer';
const Layout = (props) => {
  return (
    <React.Fragment>
          <HeaderNav />
          {props.children}
          <FooterNav/>
    </React.Fragment>
  )
}

export default Layout;
