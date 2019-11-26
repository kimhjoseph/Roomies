import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./RoomiesLanding.css";

export default class RoomiesLanding extends Component {
  // TODO: OAuth stuff will need to be added here

  render() {
    return (
      <div className="main">
        <div className="container-left">
          <h1>Roomies</h1>
          <p>It's time to make your Roommates Great</p>
        </div>
        <div className="container-right">
          <Link to="/home">
            <Button variant="outline-primary" className="login-button">
              Continue With Facebook
            </Button>
          </Link>
          <Link to="/home">
            <Button variant="outline-primary" className="login-button">
              Continue With Google
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}
