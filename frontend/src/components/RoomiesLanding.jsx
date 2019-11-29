import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./RoomiesLanding.css";

export default class RoomiesLanding extends Component {
  // TODO: OAuth stuff will need to be added here

  render() {
    return (
      <div className="main">
        <div className="inner-container">
          <h1 style={{ fontSize: "70px" }}>Roomies</h1>
          <h5 style={{ margin: "0px 0px 24px 0px" }}>
            It's time to make your Roommates Great
          </h5>
        </div>
        <div className="inner-container">
          <Link to="/home">
            <button className="custom-landing-button">
              Continue With Facebook
            </button>
          </Link>
          <Link to="/home">
            <button className="custom-landing-button">
              Continue With Google
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
