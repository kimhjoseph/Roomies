import React from 'react';
import { Container, Row, Col } from 'reactstrap';
<<<<<<< HEAD
import UserList from './UserList';

=======
import UserCard from './UserCard';
import NotificationCard from './NotificationCard';
import NotificationCards from './NotificationCards';
>>>>>>> 955633a81f9863a276162e3f6abcc4a7fbaf39b2

function RoomiesHome() {
    return (
      <div>
          <h1>Good Morning Rondald</h1>
<<<<<<< HEAD
      	  <UserList/>
=======


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
>>>>>>> 955633a81f9863a276162e3f6abcc4a7fbaf39b2

      </div>
    );
  }

  export default RoomiesHome;
