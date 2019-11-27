import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import UserList from "./UserList";
import NotificationCards from "./NotificationList";
import MainCard from "./MainCard";
import NavbarComponent from "./NavbarComponent";
import ProfileChangeModal from "./ProfileChangeModal";
import dummy from "../images/dummy.jpg";
import "./Settings.css";

export default class ShoppingList extends Component {
  constructor(props) {
    super(props);

    this.handleUpdateInfo = this.handleUpdateInfo.bind(this);
    this.showChangeInfoModal = this.showChangeInfoModal.bind(this);
    this.updateName = this.updateName.bind(this);

    this.state = {
      changeInfoModal: false,
      userInfo: {
        name: "Rondald",
        id: 90342,
        bio: "srrsly fuck the middle class"
      },
      newInfo: {
        name: "",
        id: 0,
        bio: ""
      },
      userName: "Rondald"
    };
  }

  showChangeInfoModal() {
    this.setState({ changeInfoModal: !this.state.changeInfoModal });
  }

  handleUpdateInfo(newInfo) {
    console.log(newInfo);
    this.setState({
      userInfo: {
        name: newInfo.name,
        id: newInfo.id,
        bio: newInfo.bio
      }
    });
    console.log(this.state.userInfo);
  }

  updateName(e) {
    const value = e.target.value;
    console.log(value);
    this.setState({
      newInfo: {
        name: value,
        id: this.state.newInfo.id,
        bio: this.state.newInfo.bio
      }
    });
    console.log(this.state.newInfo.name);
  }

  render() {
    return (
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <NavbarComponent />

        <h1
          style={{ marginTop: "20px", marginBottom: "0px", fontWeight: "800" }}
        >
          Settings
        </h1>

        <Container style={{ height: "100%", alignContent: "center" }}>
          <div className="rounded-circle">
            <img className="rounded-circle" src={dummy} />
            <div className="name">{this.state.userInfo.name}</div>
            <button
              onClick={this.showChangeInfoModal}
              className="change-info-button"
            >
              Change User Info
            </button>
            <ProfileChangeModal
              onClose={this.showChangeInfoModal}
              show={this.state.changeInfoModal}
              handleUpdateInfo={this.handleUpdateInfo}
              updateName={this.updateName}
              userInfo={this.state.userInfo}
              newInfo={this.state.newInfo}
            />
          </div>
        </Container>
      </div>
    );
  }
}
