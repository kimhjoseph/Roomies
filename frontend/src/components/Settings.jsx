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
        firstname: "Rondald",
        lastname: "Rondaldson",
        id: 90342,
        bio: "srrsly fuck the middle class"
      },
      newInfo: {
        firstname: "",
        lastname: "",
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
    axios.get('http://localhost:4000/user/get')
    .then(response => {
      const user = response.data[0];
      this.setState({
        newInfo: {
          firstname: user.first_name,
          lastname: user.last_name,
          id: this.state.newInfo.id,
          bio: this.state.newInfo.bio
        }
      });
    })
    .catch(function (error){
        console.log(error);
    })
    
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
    document.getElementById("img").click();
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
              <input type="image" src={this.state.imagefile} className="rounded-circle" onClick={this.clickImageUploader}/>
              <input type="file" id="img" accept="image/*" onChange={this.handleImageAdded} style={{display: "none"}}/>
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
