import React from "react";
import UserList from "./UserList";
import NotificationCards from "./NotificationList";
import MainCard from "./MainCard";
import NavbarComponent from "./NavbarComponent";
import { Container, Row, Col } from "reactstrap";
// import './Card.css';
import "./RoomiesHome.css";

function RoomiesHome() {
  return (
    <div style={{ height: "100vh" }}>
      <NavbarComponent />
      <Container style={{ alignContent: "center" }}>
        <Row style={{ alignItems: "center", height: "100%" }}>
          <Col md="8" style={{ height: "50%", marginBottom: "10%" }}>
            <MainCard />
          </Col>
          <Col md="4" style={{ height: "100%" }}>
            <Container style={{ alignItems: "center" }}>
              <UserList />
              <NotificationCards />
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RoomiesHome;
