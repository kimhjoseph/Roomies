import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import "./Login.css";
import axios from 'axios';

class Login extends Component {
  // TODO: OAuth stuff will need to be added here

  constructor(props){
    super(props)

    this.state = {
      email: '',
      password: ''
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
      e.preventDefault();

      const newUser = {
        email: this.state.email,
        password: this.state.password
      };

      axios.post('http://localhost:4000/user/login', newUser)
        .then(res => {
          if (res.data == "Success"){
            this.props.history.push("/home");
          }
          else {
            this.props.history.push("/login");
          }
          })
    }

    onChangeEmail(e){
      this.setState({email: e.target.value})

    };

    onChangePassword(e){
      this.setState({password: e.target.value})
    };

  render() {
    return (
      <div className="main">
        <div className="inner-container">
          <h1 style={{ fontSize: "70px", paddingBottom: "0px" }}>Roomies</h1>
          <h5 className="login-sub" style={{ margin: "0px 0px 24px 0px" }}>
            It's time to make your Roommates Great
          </h5>
        </div>
        <div className="inner-container">
          <Form className="login-form" style={{ width: "60%" }} onSubmit={this.onSubmit}>
            <div className="login-title">
              <h3>Welcome Back!</h3>
            </div>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Email" value={this.state.email} onChange = {this.onChangeEmail}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" value={this.state.password} onChange = {this.onChangePassword}/>
            </Form.Group>
            <input type='submit' value='Log In' className="custom-sign-button" style={{align: "center"}}/>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
