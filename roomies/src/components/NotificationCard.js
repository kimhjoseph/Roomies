import React, { Component } from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import './Card.css';


class NotificationCard extends Component {
	constructor() {
		super();
	}

	render () {
		return (
		    <div>
		      <Card className="NotificationCard">
		        <Card body className="NotificationText">This is a notificiaton.</Card>
		      </Card>
          </div>
		)
	}
}

export default NotificationCard;
