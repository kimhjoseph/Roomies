import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import "./MainCard.css";
import dummy from "../images/dummy.jpg";

export default class MainCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: ""
    };
  }

  render() {
    return (
      <Card className="main-card">
        <Card.Body>
          <Card.Title className="greeting" style={{ fontSize: "28px" }}>
            Good Morning,
            <br />
            Rondald
          </Card.Title>
          <div>
            {/* TODO: currently getting the image in a weird way, should be done better */}
            <img
              src={dummy}
              style={{ height: "125px", width: "125px" }}
              alt=""
            ></img>
          </div>
          <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
            <button className="custom-status-button">Home</button>
            <button className="custom-status-button">Away</button>
            <button className="custom-status-button">Sleeping</button>
            <button className="custom-status-button">Busy</button>
          </div>
          <Card.Text>Chores assigned: Sweeping (14 day(s) late)</Card.Text>
          <Card.Text>
            Upcoming Event: Thanksgiving Potluck (11/24 at 5PM)
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
