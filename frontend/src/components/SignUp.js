import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./Login.css";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

class SignUp extends Component {
  // TODO: OAuth stuff will need to be added here

  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      validated: false,
      error: false
    };

    this.onChangeFirst = this.onChangeFirst.bind(this);
    this.onChangeLast = this.onChangeLast.bind(this);
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
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password
      };
      axios
        .post("http://localhost:4000/user/signup", newUser)
        .then(res => {
          console.log(res.data);
          if (res.data == "Success") {
            this.props.history.push("/join");
          } else {
            this.props.history.push("/signup");
          }
        })
        .catch(error => {
          this.setState({
            error: true
          });
        });
    }
  }

  onChangeFirst(e) {
    this.setState({ first_name: e.target.value });
  }

  onChangeLast(e) {
    this.setState({ last_name: e.target.value });
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
            onSubmit={this.onSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "90%"
            }}
          >
            <div>
              <h3 style={{ marginBottom: "12px" }}>Create your account</h3>
            </div>
            <Form.Row style={{ display: "flex", flexDirection: "row" }}>
              <Col>
                <Form.Group>
                  <Form.Control
                    required
                    placeholder="First name"
                    value={this.state.first_name}
                    onChange={this.onChangeFirst}
                    style={{ width: "160px" }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    required
                    placeholder="Last name"
                    value={this.state.last_name}
                    onChange={this.onChangeLast}
                    style={{ width: "160px" }}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                required
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                style={{ width: "330px" }}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control
                required
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onChangePassword}
                style={{ width: "330px" }}
              />
            </Form.Group>
            {this.state.error === true ? (
              <p
                style={{
                  fontFamily: "Sansita",
                  fontStyle: "normal",
                  color: "#dc3545"
                }}
              >
                An error has occurred: Please try again later.
              </p>
            ) : null}
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                type="submit"
                value="Sign Up"
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

export default withRouter(SignUp);
