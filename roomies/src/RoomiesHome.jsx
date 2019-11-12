import React from 'react';
import UserList from './UserList'
import NotificationCards from './NotificationList'
import { Container, Row, Col } from 'reactstrap';
import './Card.css'

function RoomiesHome() {
    return (
      <div>
          <h1>Good Morning Rondald</h1>
          <Container className='MainContainer'>
            <UserList/>
            <NotificationCards/>
          </Container>

      </div>
    );
  }

  export default RoomiesHome;
