import React, { Component } from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

class NotificationCard extends Component {
	constructor() {
		super();
	}

	render () {
		return (
		    <div>
		      <Card>
		        <Card body>This is a notificiaton.</Card>
		      </Card>
          </div>
		)
	}
}

export default NotificationCard;
