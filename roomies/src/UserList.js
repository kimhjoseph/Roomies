import React, { Component } from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import UserCard from './UserCard';
import './UserList.css'

class UserList extends Component {
	constructor() {
		super();
	}

	render () {
		return (
		    <div>
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

		)
	}
}

export default UserList;