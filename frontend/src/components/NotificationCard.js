import React, { Component } from "react";
import Card from "react-bootstrap/Card";

class NotificationCard extends Component {
  render() {
    return (
      <div>
        <Card style={{ width: "16rem" }}>
          <Card.Body className="NotificationCard">
            <Card.Text className="NotificationText">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default NotificationCard;
