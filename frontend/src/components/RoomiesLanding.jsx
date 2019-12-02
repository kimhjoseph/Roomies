import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./RoomiesLanding.css";

export default class RoomiesLanding extends Component {
  // TODO: OAuth stuff will need to be added here

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
          <Link to="/login">
            <button className="custom-landing-button">Login</button>
          </Link>
          <Link to="/signup">
            <button className="custom-landing-button">Signup</button>
          </Link>
        </div>
      </div>
    );
  }
}
