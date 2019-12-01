import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./Login.css";
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class SignUp extends Component {
  // TODO: OAuth stuff will need to be added here


  constructor(props){
    super(props)

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    };

    this.onChangeFirst = this.onChangeFirst.bind(this);
    this.onChangeLast = this.onChangeLast.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
      e.preventDefault();

      const newUser = {
        first_name : this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password
      };

      axios.post('http://localhost:4000/user/signup', newUser)
        .then(res => {
          console.log(res.data);
          if (res.data == "Success"){
            this.props.history.push("/home");
          }
          else {
            this.props.history.push("/signup");
          }
          }) 
    }

    onChangeFirst(e){
      this.setState({first_name: e.target.value})

    };

    onChangeLast(e){
      this.setState({last_name: e.target.value})

    };

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
          <h1 style={{ fontSize: "70px" }}>Roomies</h1>
          <h5 className="login-sub" style={{ margin: "0px 0px 24px 0px" }}>
            It's time to make your Roommates Great
          </h5>
        </div>
        <div className="inner-container" >
          <Form onSubmit={this.onSubmit}>
            <div>
              <h3>Create your account</h3>
            </div>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Control placeholder="First name" value={this.state.first_name} onChange = {this.onChangeFirst}/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control placeholder="Last name" value={this.state.last_name} onChange = {this.onChangeLast}/>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Email" value={this.state.email} onChange = {this.onChangeEmail} />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" value={this.state.password} onChange = {this.onChangePassword}/>
            </Form.Group>
            <input type='submit' value='Sign Up' className="custom-sign-button" style={{align: "center"}}/>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);


