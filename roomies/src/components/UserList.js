import React, { Component } from "react";
import { Container, CardDeck } from "react-bootstrap";
import UserCard from "./UserCard";
import "./Card.css";

class UserList extends Component {
  render() {
    return (
      <Container>
        <CardDeck style={{ alignItems: "center", justifyContent: "center" }}>
          <div className="section-title">Roomies</div>
          <UserCard />
          <UserCard />
          <UserCard />
        </CardDeck>
      </Container>
    );
  }
}

export default UserList;
