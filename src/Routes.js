import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Layout from "./component/Hoc/Layout";
import SignIn from "./component/Account/SignIn";
import Register from "./component/Account/Register";
import ReadPost from "./component/Home/ReadPost";
import Home from "./component/Home/index";
import { connect } from "react-redux";
import { loadUser } from './actions/index';
import history from "./history";
class Routes extends React.Component{
  async componentWillMount() {
    
    await this.props.loadUser(history.location.pathname)
  }
  render(){
    return (
      <Layout>
        <Switch>
          <Route exact path="/signin"  component={SignIn}  />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={ReadPost}/>
        </Switch>
      </Layout>
    )
  }
}

export default connect(null,{ loadUser })(Routes);
