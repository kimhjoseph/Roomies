import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import dummy from "../images/dummy.jpg";
import "./NavbarComponent.css";

export default class NavbarComponent extends Component {
  render() {
    return (
      <Navbar
        expand="lg"
        sticky="top"
        variant="dark"
        className="navbar-component"
      >
        <Navbar.Brand href="#home" className="home">
          Roomies
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">List</Nav.Link>
            <Nav.Link href="#link">Chores</Nav.Link>
            <Nav.Link href="#calendar">Calendar</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown
              title={<img src={dummy} />}
              alignRight
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
