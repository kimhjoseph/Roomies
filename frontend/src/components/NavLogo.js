import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import "./NavbarComponent.css";

export default class NavbarLogo extends Component {
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
      </Navbar>
    );
  }
}

