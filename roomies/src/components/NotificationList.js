import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import NotificationCard from './NotificationCard';
import './Card.css';



class NotificationCards extends Component {
	constructor() {
		super();
	}

	render () {
		return (
      <div>
      <Container className="NotificationContainer">
      	<Row>
      		<Col>
              <NotificationCard  />
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
