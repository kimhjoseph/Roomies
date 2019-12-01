import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import UserCard from "./UserCard";
import "./UserList.css";

import axios from 'axios';
import dummy from "../images/dummy.jpg";

axios.defaults.withCredentials = true;

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imagefile: dummy,
      users: [],
    };

    axios.get('http://localhost:4000/user/get_users')
    .then(res => {
      this.setState({ users: res.data
      });
    })
    .catch(function (error){
        console.log(error);
    });
  }

  render() {
    return (
      <Container>
        <div className="user-list">
          <h2>Roomies</h2>
          {this.state.users.map((value, index) => {
            return <UserCard 
                  user = {value}
                  />
          })}
        </div>
      </Container>
    );
  }
}

export default UserList;
