import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col, CardDeck } from 'react-bootstrap';
import UserCard from './UserCard';
import './Card.css'

class UserList extends Component {
	constructor() {
		super();
	}

	render () {
		return (
		    <Container>
		    	<CardDeck style={{alignItems:'center', justifyContent:'center'}}>
		      		<div className="section-title">Roomies</div>
					<UserCard />
					<UserCard />
					<UserCard />
			    </CardDeck>
		    </Container>
		)
	}
}

export default UserList;
