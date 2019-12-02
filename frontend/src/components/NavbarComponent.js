import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import dummy from "../images/dummy.jpg";
import "./NavbarComponent.css";
import axios from "axios";

export default class NavbarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: ""
    };
  }

  async componentDidMount() {
    await axios
      .get("http://localhost:4000/user/get_current_user")
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });

    console.log(this.state.users);
    document
      .getElementById("nav-img")
      .setAttribute(
        "src",
        "http://localhost:4000/load_image/" + this.state.user.picture
      );
  }

  render() {
    return (
      <Navbar
        // expand="sm"
        sticky="top"
        variant="dark"
        className="navbar-component"
      >
        <Navbar.Brand href="/home" className="home">
          Roomies
        </Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav"> */}
        <Nav className="mr-auto">
          <Nav.Link href="/list">List</Nav.Link>
          <Nav.Link href="/chores">Chores</Nav.Link>
          <Nav.Link href="/calendar">Calendar</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <NavDropdown
            title={
              <img
                id="nav-img"
                className="rounded-circle"
                style={{ height: "45px", width: "45px" }}
                alt=""
              ></img>
            }
            alignRight
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
            <NavDropdown.Item href="/">Log Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        {/* </Navbar.Collapse> */}
      </Navbar>
    );
  }
}
