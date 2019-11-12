import React, { Component } from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import './UserCard.css'

class UserCard extends Component {
	constructor() {
		super();
	}

	render () {
		return (
		    <div>
		      <Card>
		        <CardBody>
		          <CardTitle>Zachary</CardTitle>
		          <CardSubtitle>Card subtitle</CardSubtitle>
		        </CardBody>
		      </Card>
		    </div>

		)
	}
}

export default UserCard;