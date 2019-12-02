import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import DummyIcon from "../images/dummy.jpg";
import { Row, Col } from "react-bootstrap";
import "./UserCard.css";

class UserCard extends Component {
  async componentDidMount() {
    console.log(this.props.user);
    document
      .getElementById("card-img" + this.props.user.first_name)
      .setAttribute(
        "src",
        "http://localhost:4000/load_image/" + this.props.user.picture
      );
  }

  render() {
    return (
      <div>
        <Card.Body
          className="user-card"
          style={{ width: "16rem", paddingTop: "0px", paddingBottom: "0px" }}
        >
          <Row style={{ alignItems: "center" }}>
            <Col md="3" style={{ padding: "0px" }}>
              <Card.Img
                id={"card-img" + this.props.user.first_name}
                className="rounded-circle"
                style={{ height: "40px", width: "40px" }}
              />
            </Col>
            <Col md="9">
              <Card.Title
                className="user-title"
                style={{ marginBottom: "0px" }}
              >
                {this.props.user.first_name}
              </Card.Title>

              <Card.Text className="user-subtitle">
                {this.props.user.status}
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </div>
    );
  }
}

export default UserCard;
