import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Layout from "./component/Hoc/Layout";
import SignIn from "./component/Account/SignIn";
import EditPost from "./component/Home/EditPost";
import Register from "./component/Account/Register";
import Home from "./component/Home/index";
const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/signin"  component={SignIn}  />
        <Route exact path="/register" component={Register} />
        <Route exact path="/post/:id" component={EditPost} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Layout>
  )
}

export default Routes;
