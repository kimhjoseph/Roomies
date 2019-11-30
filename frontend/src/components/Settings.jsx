import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";

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
    this.updateFirstName = this.updateFirstName.bind(this);
    this.updateLastName = this.updateLastName.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updateProfilePic = this.updateProfilePic.bind(this);
    this.handleImageAdded = this.handleImageAdded.bind(this);

    this.state = {
      imagefile: dummy,
      changeInfoModal: false,
      userInfo: {
        firstname: "",
        lastname: "",
        email: "",
        profile_image: ""
      },
      newInfo: {
        firstname: "",
        lastname: "",
        email: "",
        profile_image: ""
      },
      userName: "Rondald"
    };

    axios
      .get("http://localhost:4000/user/get")
      .then(response => {
        const user = response.data[0];
        this.setState({
          userInfo: {
            firstname: user.first_name,
            lastname: user.last_name,
            email: user.email,
            profile_image: "damn"
          }
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  showChangeInfoModal() {
    this.setState({ changeInfoModal: !this.state.changeInfoModal });
  }

  updateFirstName(e) {
    const value = e.target.value;
    const ln = this.state.newInfo.lastname;
    const email = this.state.newInfo.email;
    const pp = this.state.newInfo.profile_image
      this.setState({
        newInfo: {
          firstname: value,
          lastname: ln != "" ? ln : this.state.userInfo.lastname,
          email: email != "" ? email : this.state.userInfo.email,
          profile_image: pp != "" ? pp : this.state.userInfo.profile_image
        }
      });
      console.log(this.state.newInfo);
  }

  updateLastName(e) {
    const value = e.target.value;
    const fn = this.state.newInfo.firstname;
    const email = this.state.newInfo.email;
    const pp = this.state.newInfo.profile_image
      this.setState({
        newInfo: {
          firstname: fn != "" ? fn : this.state.userInfo.firstname,
          lastname: value,
          email: email != "" ? email : this.state.userInfo.email,
          profile_image: pp != "" ? pp : this.state.userInfo.profile_image
        }
      });
      console.log(this.state.newInfo);
  }

  updateEmail(e) {
    const value = e.target.value;
    const fn = this.state.newInfo.firstname;
    const ln = this.state.newInfo.lastname;
    const pp = this.state.newInfo.profile_image
      this.setState({
        newInfo: {
          firstname: fn != "" ? fn : this.state.userInfo.firstname,
          lastname: ln != "" ? ln : this.state.userInfo.lastname,
          email: value,
          profile_image: pp != "" ? pp : this.state.userInfo.profile_image
        }
      });
      console.log(this.state.newInfo);
  }

  updateProfilePic(e) {
    const value = e.target.value;

    this.setState({
      newInfo: {
        firstname: this.state.userInfo.firstname,
        lastname: this.state.userInfo.lastname,
        email: this.state.userInfo.email,
        profile_image: value
      }
    });

    console.log(this.state.newInfo);
  }

  handleImageAdded(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    console.log(file);

    reader.onloadend = () => {
      this.setState({
        imagefile: file,
        imagePreviewUrl: reader.result
      });
    };

    var url = reader.readAsDataURL(file);
    console.log(url);
  }

  clickImageUploader() {
    document.getElementById("profile_image").click();
  }

  handleUpdateInfo = async newInfo => {
    console.log(newInfo);
    await axios
      .post("http://localhost:4000/user/edit_info", newInfo)
      .then(response=> {
        this.setState({userInfo: newInfo})
        console.log(this.state.userInfo)
      })
      .catch(function(error) {
        console.log(error);
      });
    console.log(this.state.newInfo);
  };

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
            <form method="post" enctype="multipart/form-data" action="/upload">
              <input
                type="image"
                src={this.state.imagefile}
                className="rounded-circle"
                onClick={this.clickImageUploader}
              />
              <input
                type="file"
                id="profile_image"
                accept="image/*"
                onChange={this.handleImageAdded}
                style={{ display: "none" }}
              />
            </form>
            <div className="name">{this.state.userInfo.firstname} {this.state.userInfo.lastname}</div>
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
              updateFirstName={this.updateFirstName}
              updateLastName={this.updateLastName}
              updateEmail={this.updateEmail}
              updateProfilePic={this.updateProfilePic}
              userInfo={this.state.userInfo}
              newInfo={this.state.newInfo}
            />
          </div>
        </Container>
      </div>
    );
  }
}
