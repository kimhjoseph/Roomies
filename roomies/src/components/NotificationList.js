import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CardDeck from 'react-bootstrap/CardDeck';
import NotificationCard from './NotificationCard';
import './Card.css';



class NotificationCards extends Component {
	constructor() {
		super();
	}

	render () {
		return (
			<div>
			<div className='section-title'> Notifications </div>
      <CardDeck className='NotificationContainer'>
              <NotificationCard  />
              <NotificationCard />
              <NotificationCard />
							<NotificationCard />
							<NotificationCard />
        </CardDeck>
      </div>
		)
	}
}

export default NotificationCards;
