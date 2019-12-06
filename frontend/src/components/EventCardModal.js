import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import moment from 'moment';

export default class CalendarCreateEventModal extends Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
    // this.toggleAllUsers = this.toggleAllUsers.bind(this);

    this.state = {
      show: this.props.show,
      allUsers: false
    };
  }

  onClose = e => {
    if (e !== undefined) e.preventDefault();
    this.props.onClose();
  };

  handleDisableClick = e => {
    e.stopPropagation();
    e.preventDefault();
    this.props.handleAddEvent(this.props.tempEvent);
    this.onClose();
  };
  render() {
    const tempEvent = this.props.tempEvent;
    let users = tempEvent.users;
    let options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'medium', minute: 'short' };
    return (
      <Modal
        show={this.props.show}
        onHide={this.onClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{tempEvent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="title">
              <Form.Label style={{ marginBottom: "8px", paddingRight: "5px" }}>When:</Form.Label>
    {moment(tempEvent.start).toDate().toDateString()}  {moment(tempEvent.start).toDate().toLocaleTimeString()} to {moment(tempEvent.end).toDate().toDateString()} {moment(tempEvent.end).toDate().toLocaleTimeString()}
            </Form.Group>
            <Form.Group controlId="attendees">
              <Form.Label style={{ marginBottom: "8px", paddingRight: "5px" }}>Attendees:</Form.Label>
              <ul>{users.map(user => <li>{user}</li>)}</ul>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}