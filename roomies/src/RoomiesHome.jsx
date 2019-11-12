import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import UserCard from './UserCard';
import NotificationCard from './NotificationCard';

function RoomiesHome() {
    return (
      <div>
          <h1>Good Morning Rondald</h1>


      <Container>
      	<Row>
      		<Col sm="4">
      			<UserCard />
      			<UserCard />
      			<UserCard />
      		</Col>
      	</Row>
      </Container>

      <Container>
      	<Row>
      		<Col sm="4">
      			<NotificationCard />
      			<NotificationCard />
      			<NotificationCard />
      		</Col>
      	</Row>
      </Container>
      </div>
    );
  }

  export default RoomiesHome;
