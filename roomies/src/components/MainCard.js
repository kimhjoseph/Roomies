import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import './MainCard.css';
import dummy from '../images/dummy.jpg';

export default class MainCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Card className="main-card">
                    <Card.Body>
                        <Card.Title className="greeting">Good Morning, Rondald</Card.Title>
                        <div>
                            {/* TODO: currently getting the image in a weird way, should be done better */}
                            <img src={dummy}></img>
                        </div>
                        <div>
                            <Button variant="outline-primary" className="status-button">Home</Button>
                            <Button variant="outline-primary" className="status-button">Away</Button>
                            <Button variant="outline-primary" className="status-button">Sleeping</Button>
                            <Button variant="outline-primary" className="status-button">Busy</Button>
                        </div>
                        <Card.Text>Chores assigned: Sweeping (14 day(s) late)</Card.Text>
                        <Card.Text>Upcoming Event: Thanksgiving Potluck (11/24 at 5PM)</Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}