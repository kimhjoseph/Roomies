import React from 'react';
import UserList from './UserList';
import NotificationCards from './NotificationList';
import MainCard from './MainCard';
import { Container, Row, Col } from 'reactstrap';
// import './Card.css';
import './RoomiesHome.css';

function RoomiesHome() {
    return (
      <div>
            <MainCard/>
            <Container className='MainContainer'>
              <UserList/>
              <NotificationCards/>
            </Container>
      </div>
    );
  }

  export default RoomiesHome;
