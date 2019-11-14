import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
<<<<<<< HEAD
=======
import DummyIcon from '../images/dummy.jpg'; 
import { Row, Col } from 'react-bootstrap';
>>>>>>> 17d214dc1179270595c2c50781a3a5c1001fefff
import './Card.css'

class UserCard extends Component {
	constructor() {
		super();
	}

	render() {
		return (
		    <div>
				  <Card.Body className="user-card" style={{ width: '16rem', paddingTop: '0px', paddingBottom: '0px'}}>
					<Row style={{alignItems: 'center'}}>
						<Col md="3" style={{padding: '0px'}}>
							<Card.Img src={DummyIcon} style={{width: '100%', height: '100%'}} />
						</Col>
						<Col md="9">
							<Card.Title className="user-title" style={{marginBottom: '0px'}}>Zachary</Card.Title>
							<Card.Text className="user-subtitle">
							Sleeping
							</Card.Text>
						</Col>
					</Row>
				  </Card.Body>
		    </div>
		)
	}
}

export default UserCard;
