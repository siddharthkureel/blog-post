import React from "react";
import ReactDOM from "react-dom";
import {Router}  from 'react-router-dom';
import { createStore,applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import history from "./history";
import { rootReducer } from "./reducers/index";
import Routes from "./Routes";
class App extends React.Component{
  
  render(){
    return(
    <Router history={history} >
        <Routes />
    </Router>
    )
  }
}

ReactDOM.render(
<Provider store={createStore(rootReducer,applyMiddleware(thunk))}>
  <App/>
</Provider>
,document.getElementById('root'))