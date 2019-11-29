import React from "react";
import NavbarComponent from "./NavbarComponent";
import { Container, Row, Col } from "react-bootstrap";
import ChoreList from "./ChoreList";
import RoomieChoreList from "./RoomieChoreList";

function Chores() {
  return (
    <div style={{ height: "100vh" }}>
      <NavbarComponent />
      <Container>
          <ChoreList/>
      </Container>
    </div>
  );
}

export default Chores;
