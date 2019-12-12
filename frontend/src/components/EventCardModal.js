import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";


export default class CalendarCreateEventModal extends Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
    this.click = this.click.bind(this);
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

  click() {
    let eventId = this.props.tempEvent.eventId;
    this.props.deleteEvent(eventId);
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
          <FontAwesomeIcon
            icon={faTrashAlt}
            className="edit-button"
            onClick={() => this.click()}
          />
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