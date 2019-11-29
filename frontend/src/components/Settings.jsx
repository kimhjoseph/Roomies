import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from 'axios';

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
    this.handleImageAdded = this.handleImageAdded.bind(this)

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
          bio: "damn"
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

 
 

  updateName(e) {
    const value = e.target.value;
    this.setState({
      newInfo: {
        firstname: value.firstname,
        lastname: value.lastname,
        id: this.state.newInfo.id,
        bio: this.state.newInfo.bio
      }
    });
    
    console.log(this.state.newInfo.firstname);
  }

  
  handleImageAdded(e){
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    console.log(file);

    reader.onloadend = () => {
      this.setState({
        imagefile: file,
        imagePreviewUrl: reader.result
      });
    }

    var url = reader.readAsDataURL(file);
    console.log(url)
  }

  clickImageUploader(){
    document.getElementById("profile_image").click();
  }

  handleUpdateInfo = async newInfo => {
    const userInfo = this.state.userInfo;
    console.log(newInfo);
    await axios.post("http://localhost:4000/user/edit_info", newInfo)
    .then(response => {
      this.setState({ userInfo: response.data });
    })
    .catch(function(error) {
      console.log(error);
    });
    console.log(this.state.userInfo);
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
              <input type="image" src={this.state.imagefile} className="rounded-circle" onClick={this.clickImageUploader}/>
              <input type="file" id="profile_image" accept="image/*" onChange={this.handleImageAdded} style={{display: "none"}}/>
            </form>
            <div className="name">{this.state.userInfo.firstname}</div>
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
