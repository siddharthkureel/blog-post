import React, { Component } from 'react'
import { validate } from "../ui/validate";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/index";
class Register extends Component {
  state={
      id:'',
      formSuccess:'',
      formError:true,
      formData:{
        name:{
          value:'',
          valid:false,
          validMessage:'',
          validation:{
            required:true,
            minLength:3
          }
        },
        password:{
          value: '',
          valid: false,
          validMessage: '',
          validation: {
            required: true,
            minLength: 5
          }
        },
        Address:{
          value:'',
          valid:false,
          validMessage: '',
          validation: {
            required: true,
            minLength: 5
          }
        },
        email: {
          value: '',
          valid: false,
          validMessage: '',
          validation: {
            required: true,
            email:true
          }
        }
      }
  }
  updateForm=(element)=>{
  let newFormData = {...this.state.formData}
  let newelement = newFormData[element.target.name];
    newelement.value=element.target.value;
    let validData = validate(newelement);
    newelement.valid=validData[0];
    newelement.validMessage=validData[1]
    this.setState({
        formData:newFormData
    });
  }
  onSubmit=(e)=>{
  e.preventDefault();
  let formIsValid = true;
  let dataToSubmit = {}
  for(let key in this.state.formData){
    dataToSubmit[key] = this.state.formData[key].value;
    formIsValid = this.state.formData[key].valid;
  }
  if(formIsValid){
   this.props.registerUser(dataToSubmit);
   this.setState({
     formSuccess:'Submitted successfully',
     formError:false
     })
  }
  }
  render() {
    const {name,password,Address,email} =this.state.formData;
    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <h2 className="inactive underlineHover">Register</h2>
          <form onSubmit={this.onSubmit}>

            <input type="text" name="email"value={email.value} 
            onChange={(element) => this.updateForm(element)} className="fadeIn third" placeholder="Enter Your Email" />
            <div>
               {email.validMessage}
            </div>
            <input type="text" id={'name'} name="name" value={name.value} 
            onChange={(element) => this.updateForm(element)} className="fadeIn second" placeholder="Enter Your Name" />
            
            <div> {name.validMessage}</div>

            <input placeholder="Enter Your Password" type="password" name="password" 
            value={password.value} onChange={(element) => this.updateForm(element)} className="fadeIn third"/>
            <div>{password.validMessage}</div>

            <input placeholder="Enter Your Address" type="text" name="Address"
             value={Address.value} onChange={(element) => this.updateForm(element)} className="fadeIn third" />
            <div>{Address.validMessage}</div>

            <input type='submit' value="submit" />
          </form>
          <div id="formFooter">
            <Link to="/signin" className="underlineHover" href="#">Sign In</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null,{registerUser})(Register);
