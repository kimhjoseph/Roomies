import React from "react";
import NavbarComponent from "./NavbarComponent";
import { Container, Row, Col, Button } from "reactstrap";
import ChoreList from "./ChoreList";
import RoomieChoreList from "./RoomieChoreList";
import ModalButton from "./Modal";

function Chores() {
  return (
    <div style={{height:'100vh'}}>
      <NavbarComponent />
      <Container>
        <Row style={{ alignItems: 'center', height:'100%', width:'100%'}}>
          <Col md="6" style={{height:'50%', marginBottom: '10%'}}>
            <ChoreList />
          </Col>
          <Col md="6" style={{height:'50%', marginBottom: '10%', width:'100%'}}>
            <RoomieChoreList />
          </Col>
        </Row>
        <ModalButton />
      </Container>
    </div>
  );
}

export default Chores;



