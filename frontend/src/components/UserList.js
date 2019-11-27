import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import UserCard from "./UserCard";
import "./UserList.css";

class UserList extends Component {
  render() {
    return (
      <Container>
        <div className="user-list">
          <h2>Roomies</h2>
          <UserCard />
          <UserCard />
          <UserCard />
        </div>
      </Container>
    );
  }
}

export default UserList;
