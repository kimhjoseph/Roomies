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
            <Nav className="ml-auto">
            <NavDropdown
              title={<img src={dummy} />}
              alignRight
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Notifications</NavDropdown.Item>
              <NavDropdown.Item href="/">Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
