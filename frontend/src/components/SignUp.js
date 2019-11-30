import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./Login.css";

export default class SignUp extends Component {
  // TODO: OAuth stuff will need to be added here

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
          <Form>
            <div>
              <h3>Create your account</h3>
            </div>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Control placeholder="First name" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control placeholder="Last name" />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Email" />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <button className="custom-sign-button" style={{align: "center"}}>
              Sign up
            </button>
          </Form>
        </div>
      </div>
    );
  }
}
