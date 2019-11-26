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
        <Navbar.Brand href="/home" className="home">
          Roomies
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/list">List</Nav.Link>
            <Nav.Link href="/chores">Chores</Nav.Link>
            <Nav.Link href="#calendar">Calendar</Nav.Link>
          </Nav>
<<<<<<< HEAD
          <Nav className="ml-auto">
            <Navbar.Brand href="/settings">
              <img
                src="/dummy.jpg"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
=======
          <Nav>
            <NavDropdown
              title={<img src={dummy} alt="" />}
              alignRight
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            </NavDropdown>
>>>>>>> 50268a7ecaf093d68d0e488689605e2e0bf1dfed
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
