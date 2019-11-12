import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import UserCard from './UserCard';

function RoomiesHome() {
    return (
      <div>
          <h1>Good Morning Rondald</h1>
      

      <Container>
      	<Row>
      		<Col sm="2">
      			<UserCard />
      			<UserCard />
      			<UserCard />
      		</Col>
      	</Row>
      </Container>

      </div>
    );
  }
  
  export default RoomiesHome;