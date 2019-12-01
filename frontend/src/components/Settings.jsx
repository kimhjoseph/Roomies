import React, { Component } from "react";
import ReactDOM from "react-dom";
import FormData from "form-data";
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
    this.b64toBlob = this.b64toBlob.bind(this);

    this.state = {
      img: "",
      changeInfoModal: false,
      userInfo: {
        firstname: "",
        lastname: "",
        email: "",
        img: ""
      },
      newInfo: {
        firstname: "",
        lastname: "",
        email: "",
        img: ""
      },
      userName: "Rondald"
    };
  }

  async componentDidMount(){
    await axios
    .get("http://localhost:4000/user/get")
    .then(response => {
      const user = response.data[0];
      this.setState({
        userInfo: {
          firstname: user.first_name,
          lastname: user.last_name,
          email: user.email
        },
        img: user.img
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

  b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

  async handleImageAdded(event) {
    event.preventDefault();
    var reader;
    var newData;
    var current = this;

    if (event.target.files && event.target.files[0]) {
      reader = new FileReader();
      reader.onload = function(e) {
        newData = reader.result;
        current.setState({img:newData});
      }
      reader.readAsDataURL(event.target.files[0]);
      
      await axios
        .post("http://localhost:4000/user/edit_info", this.state.img)
        .then(response=> {
          this.setState({img: this.state.img})
          console.log(this.state.img);
        })
        .catch(function(error) {
          console.log(error);
        });
      document.getElementById("preview").setAttribute('src', this.state.img);
    }
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
              <input
                id="preview"
                type="image"
                src={this.state.img}
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
