import React, { Component } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./GroupCard.css";
import NavbarLogo from "./NavLogo";
import axios from "axios";

export default class GroupCard extends Component {
  constructor(props) {
    super(props);
    
    this.createApartment = this.createApartment.bind(this);

    this.state = {
      user: {
      email: "audrey.pham@gmail.com", 
      code: "KZ6E9"
      }, 
      apartment: ""
    };
  }

  createApartment(user) {
    axios
      .get("http://localhost:4000/apartment/create_apartment")
      .then(response => {
        console.log("Successfully created apartment.");
        this.setState({ apartment: response.data});
        console.log(this.state.apartment)
      })
      .catch(function(error) {
        console.log(error);
      });

  }

  render() {
    return (
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <NavbarLogo />
        <Container
          style={{
            height: "55%",
            width: "60%",
            margin: "0px, 15px",
            marginTop: "100px",
            align: "center"
          }}
        >
          <Card className="group-code-card" style={{ margin: "auto" }}>
            <Card.Body className="group-code-body">
              <Card.Title className="group-title" style={{ fontSize: "30px" }}>
                Group Code:
              </Card.Title>
              <div style={{ paddingTop: "2px", paddingBottom: "10px" }}>
                <form className="group-form">
                  <input
                    type="group-code-text"
                    name="group-code"
                    placeholder="ABC123"
                  />
                </form>
              </div>
              <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                <Link to="/home">
                  <Button className="group-button1">Join Group</Button>
                </Link>
              </div>
              <Card.Text className="group-text">or</Card.Text>
              <div style={{ paddingBottom: "10px" }}>
                <Link to="/home">
                  <Button className="group-button2" onClick={() => this.createApartment()}>Create Group</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}
