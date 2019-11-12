import React, { Component } from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import UserCard from './UserCard';
import './Card.css'

class UserList extends Component {
	constructor() {
		super();
	}

	render () {
		return (
		    <div>
		      <Container className="UserContainer">
		      	<Row>
		      		<Col>
		      			<UserCard />
		      			<UserCard />
		      			<UserCard />
		      		</Col>
		      	</Row>
		      </Container>
		    </div>

		)
	}
}

export default UserList;
