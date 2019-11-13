import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import './Card.css'

class UserCard extends Component {
	constructor() {
		super();
	}

	render() {
		return (
		    <div>
		      <Card style={{ width: '16rem' }}>
				  <Card.Body className="user-card">
				  	<Card.Img variant="top" src="holder.js/100px180" />
				    <Card.Title className="user-title">Zachary</Card.Title>
				    <Card.Text className="user-subtitle">
				      Sleeping
				    </Card.Text>
				  </Card.Body>
				</Card>
		    </div>
		)
	}
}

export default UserCard;
