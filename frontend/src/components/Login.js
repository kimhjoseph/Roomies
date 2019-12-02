import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import "./Login.css";
import axios from "axios";

class Login extends Component {
  // TODO: OAuth stuff will need to be added here

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      validated: false,
      badLogin: false
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true
      });
    } else {
      const newUser = {
        email: this.state.email,
        password: this.state.password
      };
      axios
        .post("http://localhost:4000/user/login", newUser)
        .then(res => {
          if (res.data == "Success") {
            this.props.history.push("/home");
          } else {
            this.props.history.push("/login");
          }
        })
        .catch(error => {
          this.setState({
            badLogin: true
          });
        });
    }
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div className="main">
        <div className="inner-container">
          <div style={{ width: "85%" }}>
            <h1 style={{ fontSize: "70px", paddingBottom: "0px" }}>Roomies</h1>
            <h5
              className="login-sub"
              style={{ width: "95%", margin: "0px 0px 24px 0px" }}
            >
              It's time to make your Roommates Great
            </h5>
          </div>
        </div>
        <div className="inner-container">
          <Form
            noValidate
            validated={this.state.validated}
            className="login-form"
            style={{
              display: "flex",
              flexDirection: "column",
              width: "85%",
              alignItems: "center"
            }}
            onSubmit={this.onSubmit}
          >
            <div className="login-title">
              <h3 style={{ marginBottom: "12px" }}>Welcome Back!</h3>
            </div>
            <Form.Group controlId="formBasicEmail" style={{ width: "330px" }}>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
            </Form.Group>
            <Form.Group
              controlId="formBasicPassword"
              style={{ width: "330px" }}
            >
              <Form.Control
                required
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
            </Form.Group>
            {this.state.badLogin === true ? (
              <p
                style={{
                  fontFamily: "Sansita",
                  fontStyle: "normal",
                  color: "#dc3545"
                }}
              >
                Incorrect email and/or password
              </p>
            ) : null}
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                type="submit"
                value="Log In"
                className="custom-sign-button"
                style={{ width: "160px", marginRight: "5px" }}
              />
              <Link to="/">
                <button
                  className="custom-sign-button"
                  style={{ width: "160px", marginLeft: "5px" }}
                >
                  Back
                </button>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
