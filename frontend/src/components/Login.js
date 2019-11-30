import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Login.css";

export default class Login extends Component {
  // TODO: OAuth stuff will need to be added here

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
          <Form className="login-form" style={{ width: "60%" }}>
            <div className="login-title">
              <h3>Welcome Back!</h3>
            </div>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Link to="/home">
              <button className="custom-landing-button">Log In</button>
            </Link>
          </Form>
        </div>
      </div>
    );
  }
}
