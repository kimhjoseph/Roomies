import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import "./GroupCard.css";
import dummy from "../images/dummy.jpg";

export default class GroupCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Card className="group-code-card">
          <Card.Body className="group-code-body">
            <Card.Title className="group-title" style={{fontSize: '30px'}}>Group Code:</Card.Title>
            <div style={{paddingTop: '2px', paddingBottom: '10px'}}>
              <form className='group-form'>
                <input type="group-code-text" 
                 name="group-code"
                 placeholder="ABC123"
                />
              </form>
            </div>
            <div style={{paddingTop: '10px', paddingBottom: '10px'}}>
              <Button className="group-button1">
                Join Group
              </Button>
            </div>
            <Card.Text style={{paddingTop: '0px', paddingBottom: '0px', marginBottom: '7px', fontFamily: 'Noto Sans', fontStyle: 'italic'}}>or</Card.Text>
            <div style={{paddingBottom: '10px'}}>
              <Button className="group-button2">
                Create Group
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}