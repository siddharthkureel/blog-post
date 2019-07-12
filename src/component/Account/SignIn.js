import React from 'react';
import { Link } from "react-router-dom";
import { reduxForm,Field } from "redux-form";
import { connect } from "react-redux";
import { signIn } from "../../actions";
class SignIn extends React.Component{
   renderError=({touched ,error})=>{
     if(touched){
       return <div>{error}</div>
     }
     return null;
   }
   renderInputs=(props)=>{
    return(
      <>
        <input {...props.input} {...props} />
        <div>{this.renderError(props.meta)}</div>
      </>
    );
  }
   onSubmit=(formValues)=>{
    this.props.signIn(formValues)
  }
  render(){
  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <h2 className="inactive underlineHover">Sign Up </h2>
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} >
          <Field type="text" placeholder="email" name="email" component={this.renderInputs} />
          <Field  type="password" placeholder="password" name="password" component={this.renderInputs} /> 
          <input type="submit" className="fadeIn fourth" value="Log In"/>
      </form>
      <div id="formFooter">
          <Link to="/register" className="underlineHover" href="#">Register</Link>
      </div>
    </div>
  </div>
  )
  }
}
const validate=(formValues)=>{
  let errors={}
  if(!formValues.email){
    errors.email = 'email is required'
  }
  if(!formValues.password){
    errors.password = 'password is required'
  }
  return errors;
}

export default connect(null,{signIn})(reduxForm({
  form: 'SignForm',
  validate
})(SignIn));
