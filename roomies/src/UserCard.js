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
		      <Card className='user-card'>
		        <CardBody className ='user-card-body'>
		          <CardTitle className ='user-card-title'>Zachary</CardTitle>
		          <CardSubtitle className='user-card-subtitle'>Card subtitle</CardSubtitle>
		        </CardBody>
		      </Card>
		    </div>

		)
	}
}

export default UserCard;