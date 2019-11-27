import React from "react";
import UserList from "./UserList";
// import NotificationList from "./NotificationList";
import MainCard from "./MainCard";
import NavbarComponent from "./NavbarComponent";
import { Container, Row, Col } from "react-bootstrap";
import "./RoomiesHome.css";

function RoomiesHome() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <NavbarComponent />
      <Container style={{ height: "100%" }}>
        <Row style={{ height: "100%", alignItems: "center" }}>
          <Col
            md={8}
            style={{
              display: "flex",
              flexDirection: "column",
              height: "60%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <MainCard />
          </Col>
          <Col
            md={4}
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div className="scrollable-user-list">
              <UserList />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RoomiesHome;
