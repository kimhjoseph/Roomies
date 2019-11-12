import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import NotificationCard from './NotificationCard';
import './Card.css'

class NotificationCards extends Component {
	constructor() {
		super();
	}

	render () {
		return (
      <div classname="NotificationCard">
      <Container class="UserCards">
      	<Row>
      		<Col sm="4">
              <NotificationCard />
              <NotificationCard />
              <NotificationCard />
        		</Col>
        	</Row>
        </Container>
      </div>
		)
	}
}

export default NotificationCards;
