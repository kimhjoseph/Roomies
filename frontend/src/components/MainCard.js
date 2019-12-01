import React, { Component } from "react";
import { Card } from "react-bootstrap";
import "./MainCard.css";
import dummy from "../images/dummy.jpg";
import axios from "axios";

axios.defaults.withCredentials = true;

export default class MainCard extends Component {
  constructor(props) {
    super(props);

    this.setStatusHome = this.setStatusHome.bind(this);
    this.setStatusAway = this.setStatusAway.bind(this);
    this.setStatusSleeping = this.setStatusSleeping.bind(this);
    this.setStatusBusy = this.setStatusBusy.bind(this);

    this.state = {
      users: {
        first_name: "",
        last_name: "",
        status: ""
      }
    };

    axios.get("http://localhost:4000/user/get_current_user")
      .then(response => {
        const user = response.data;
        this.setState({
          users: {
            first_name: user.first_name,
            last_name: user.last_name,
            status: user.status
          }
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  setStatusHome(){
    document.getElementById("Home-Button").className = "custom-status-button active";
    document.getElementById("Away-Button").className = "custom-status-button" ;
    document.getElementById("Sleeping-Button").className = "custom-status-button";
    document.getElementById("Busy-Button").className = "custom-status-button";

    var newStatus = {
      first_name: this.state.users.first_name,
      last_name: this.state.users.last_name,
      status: "Home"
    };
    
   axios
    .post("http://localhost:4000/user/edit_info", newStatus)
    .then(response=> {
      this.setState({users: newStatus})
      console.log(this.state.userInfo)
    })
    .catch(function(error) {
      console.log(error);
    });
  console.log(this.state.newStatus);
  }

  setStatusAway(){
    document.getElementById("Home-Button").className = "custom-status-button";
    document.getElementById("Away-Button").className = "custom-status-button active" ;
    document.getElementById("Sleeping-Button").className = "custom-status-button";
    document.getElementById("Busy-Button").className = "custom-status-button";
    var newStatus = {
      first_name: this.state.users.first_name,
      last_name: this.state.users.last_name,
      status: "Away"
    };
   axios
    .post("http://localhost:4000/user/edit_info", newStatus)
    .then(response=> {
      this.setState({users: newStatus})
      console.log(this.state.userInfo)
    })
    .catch(function(error) {
      console.log(error);
    });
  console.log(this.state.newStatus);
  }

  setStatusSleeping(){
    document.getElementById("Home-Button").className = "custom-status-button";
    document.getElementById("Away-Button").className = "custom-status-button" ;
    document.getElementById("Sleeping-Button").className = "custom-status-button active";
    document.getElementById("Busy-Button").className = "custom-status-button";

    var newStatus = {
      first_name: this.state.users.first_name,
      last_name: this.state.users.last_name,
      status: "Sleeping"
    };
   axios
    .post("http://localhost:4000/user/edit_info", newStatus)
    .then(response=> {
      this.setState({users: newStatus})
      console.log(this.state.userInfo)
    })
    .catch(function(error) {
      console.log(error);
    });
  console.log(this.state.newStatus);
  }

  setStatusBusy(){
    document.getElementById("Home-Button").className = "custom-status-button";
    document.getElementById("Away-Button").className = "custom-status-button" ;
    document.getElementById("Sleeping-Button").className = "custom-status-button";
    document.getElementById("Busy-Button").className = "custom-status-button active";


    var newStatus = {
      first_name: this.state.users.first_name,
      last_name: this.state.users.last_name,
      status: "Busy"
    };
   axios
    .post("http://localhost:4000/user/edit_info", newStatus)
    .then(response=> {
      this.setState({users: newStatus})
      console.log(this.state.userInfo)
    })
    .catch(function(error) {
      console.log(error);
    });
  console.log(this.state.newStatus);
  }

  render() {
    const status = this.state.users.status;
    if(status == "Home"){
      document.getElementById("Home-Button").className = "custom-status-button active";
      document.getElementById("Away-Button").className = "custom-status-button" ;
      document.getElementById("Sleeping-Button").className = "custom-status-button";
      document.getElementById("Busy-Button").className = "custom-status-button";
    }
    else if (status == "Away"){
      document.getElementById("Home-Button").className = "custom-status-button active";
      document.getElementById("Away-Button").className = "custom-status-button active" ;
      document.getElementById("Sleeping-Button").className = "custom-status-button";
      document.getElementById("Busy-Button").className = "custom-status-button";
    }
    else if (status == "Sleeping"){
      document.getElementById("Home-Button").className = "custom-status-button";
      document.getElementById("Away-Button").className = "custom-status-button" ;
      document.getElementById("Sleeping-Button").className = "custom-status-button active";
      document.getElementById("Busy-Button").className = "custom-status-button";
    }
    else if (status == "Busy"){
      document.getElementById("Home-Button").className = "custom-status-button";
      document.getElementById("Away-Button").className = "custom-status-button" ;
      document.getElementById("Sleeping-Button").className = "custom-status-button";
      document.getElementById("Busy-Button").className = "custom-status-button active";
    }
    return (
      <Card className="main-card">
        <Card.Body>
          <Card.Title className="greeting" style={{ fontSize: "28px" }}>
            Good Morning,
            <br />
            {this.state.users.first_name}
          </Card.Title>
          <div>
            {/* TODO: currently getting the image in a weird way, should be done better */}
            <img
              src={dummy}
              style={{ height: "125px", width: "125px" }}
              alt=""
            ></img>
          </div>
          <div style={{ paddingTop: "10px", paddingBottom: "10px" }} id="myButtons">
            <button id="Home-Button" className="custom-status-button" onClick={this.setStatusHome}>Home</button>
            <button id="Away-Button" className="custom-status-button" onClick={this.setStatusAway}>Away</button>
            <button id="Sleeping-Button" className="custom-status-button" onClick={this.setStatusSleeping}>Sleeping</button>
            <button id="Busy-Button" className="custom-status-button" onClick={this.setStatusBusy}>Busy</button>
          </div>
          <Card.Text>Chores assigned: Sweeping (14 day(s) late)</Card.Text>
          <Card.Text>
            Upcoming Event: Thanksgiving Potluck (11/24 at 5PM)
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
