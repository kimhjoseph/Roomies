import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import UserCard from './UserCard';
import NotificationCard from './NotificationCard';
import NotificationCards from './NotificationCards';

function RoomiesHome() {
    return (
      <div>
          <h1>Good Morning Rondald</h1>


      <Container class="UserCards">
      	<Row>
      		<Col sm="4">
      			<UserCard />
      			<UserCard />
      			<UserCard />
      		</Col>
      	</Row>
      </Container>
 
      <NotificationCards />

      </div>
    );
  }

  export default RoomiesHome;
