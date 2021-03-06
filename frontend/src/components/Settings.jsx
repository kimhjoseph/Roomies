import React, { Component } from "react";
import FormData from "form-data";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import NavbarComponent from "./NavbarComponent";
import ProfileChangeModal from "./ProfileChangeModal";
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
    this.update = this.update.bind(this);

    this.state = {
      changeInfoModal: false,
      user: "",
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
      code: ""
    };
  }

  async componentDidMount() {
    await axios
      .get("http://localhost:4000/user/get_current_user")
      .then(response => {
        this.setState({ user: response.data });
        let temp = response.data;

        this.setState({
          userInfo: {
            firstname: temp.first_name,
            lastname: temp.last_name,
            email: temp.email
          }
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    await axios
      .get("http://localhost:4000/apartment/get_apartment")
      .then(response => {
        console.log(response);
        this.setState({ code: response.data.code });
      })
      .catch(function(error) {
        console.log(error);
      });
    document
      .getElementById("img")
      .setAttribute(
        "src",
        "http://localhost:4000/load_image/" + this.state.user.picture
      );
  }

  showChangeInfoModal() {
    this.setState({ changeInfoModal: !this.state.changeInfoModal });
  }

  updateFirstName(e) {
    const value = e.target.value;
    const ln = this.state.newInfo.lastname;
    const email = this.state.newInfo.email;
    const pp = this.state.newInfo.profile_image;
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
    const pp = this.state.newInfo.profile_image;
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
    const pp = this.state.newInfo.profile_image;
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

  async handleImageAdded(e) {
    e.preventDefault();
    const file = document.getElementById("profile_image").files;
    const formData = new FormData();

    formData.append("img", file[0]);

    await axios
      .post("http://localhost:4000/upload", formData)
      .then(response => {
        console.log("The file successfully uploaded");
        console.log(response.data.id);
        this.setState({
          img_id: response.data.id
        });
      });

    document
      .getElementById("img")
      .setAttribute("src", "http://localhost:4000/upload/" + file[0].name);

    await this.update();
  }

  async update() {
    const info = this.state;
    console.log(info);
    await axios
      .post("http://localhost:4000/user/add_image", info)
      .then(response => {
        console.log(response.data);
        //this.setState({ user: response.data});
      })
      .catch(function(error) {
        console.log(error);
      });

    await axios
      .get("http://localhost:4000/user/get_current_user")
      .then(response => {
        this.setState({ user: response.data });
        console.log(this.state.user);
      })
      .catch(function(error) {
        console.log(error);
      });

    this.forceUpdate();
  }

  clickImageUploader() {
    document.getElementById("profile_image").click();
  }

  handleUpdateInfo = async newInfo => {
    console.log(newInfo);
    await axios
      .post("http://localhost:4000/user/edit_info", newInfo)
      .then(response => {
        this.setState({ userInfo: newInfo });
        console.log(this.state.userInfo);
      })
      .catch(function(error) {
        console.log(error);
      });
    console.log(this.state.newInfo);
    this.forceUpdate();
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
          <div
            className="rounded-circle"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            <input
              id="img"
              type="image"
              className="rounded-circle"
              onClick={this.clickImageUploader}
            />
            <input
              type="file"
              id="profile_image"
              onChange={this.handleImageAdded}
              style={{ display: "none" }}
            />
          </div>
          <div
            className="name"
            style={{ textAlign: "center", fontSize: "20px" }}
          >
            {this.state.userInfo.firstname} {this.state.userInfo.lastname}
            <div>
              Invite:
              <div style={{ display: "inline-block", color: "#008dc9" }}>
                {} {this.state.code}
              </div>
            </div>
            <div>
              <button
                onClick={this.showChangeInfoModal}
                className="change-info-button"
              >
                Change User Info
              </button>
            </div>
          </div>

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
        </Container>
      </div>
    );
  }
}
