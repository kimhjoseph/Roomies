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
      user: '',
      users: []
    };

    axios.get('http://localhost:4000/user/get')
    .then(res => {
      this.setState({ users: res.data
      });
    })
    .catch(function (error){
        console.log(error);
    });

    axios.get('http://localhost:4000/user/get_current_user')
    .then(res => {
      this.setState({ user: res.data
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
            if (value._id != this.state.user._id) {
            return (<UserCard 
                  user = {value}
                  />
            );
            } else {
              return null;
            }
          })}
        </div>
      </Container>
    );
  }
}

export default UserList;
