import React, { Component } from "react";
import { Container } from "react-bootstrap";
import CardDeck from "react-bootstrap/CardDeck";
import NotificationCard from "./NotificationCard";

class NotificationCards extends Component {
  render() {
    return (
      <Container style={{ alignItems: "center", padding: "0px" }}>
        <div className="section-title">Notifications</div>
        <CardDeck
          className="NotificationContainer"
          style={{
            justifyContent: "center",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
        </CardDeck>
      </Container>
    );
  }
}

export default NotificationCards;
