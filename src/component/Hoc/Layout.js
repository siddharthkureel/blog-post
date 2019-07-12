import React from 'react'
import HeaderNav from './../Navigation/Header';
const Layout = (props) => {
  return (
    <React.Fragment>
          <HeaderNav />
          {props.children}
    </React.Fragment>
  )
}

export default Layout;
