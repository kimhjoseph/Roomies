import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import moment from 'moment';
import "./ShoppingListAddItemModal.css";

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
    let allDay = this.props.tempEvent.allDay
    let allDayText = this.props.tempEvent.allDay ? "Add time" : "Make All Day";
    let dateFormat = allDay ? "MM/dd/yy" : "MM/dd/yy h:mm aa";
    return (
      <Modal
        show={this.props.show}
        onHide={this.onClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="title">
              <Form.Label style={{ marginBottom: "8px" }}>Event Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="e.g. Hangout with DAD"
                value={this.props.tempEvent.title}
                onChange={this.props.updateTitle}
              />
            </Form.Group>
            <Form.Group controlId="time">
              <Form.Label style={{ marginBottom: "0px", paddingRight: "10px"}}>When</Form.Label>
                <DatePicker
                  selected={moment(this.props.tempEvent.start).toDate()}
                  onChange={this.props.updateStart}
                  showTimeSelect={!this.props.tempEvent.allDay}
                  dateFormat={dateFormat}
                />
                <DatePicker
                  selected={moment(this.props.tempEvent.end).toDate()}
                  onChange={this.props.updateEnd}
                  showTimeSelect={!this.props.tempEvent.allDay}
                  minDate={moment(this.props.tempEvent.start).toDate()}
                  dateFormat={dateFormat}
                />
                <button onClick={this.props.toggleAllDay} className="modal-custom-button">
                  {allDayText}
                </button>
            </Form.Group>
            <Form.Group controlId="people">
              <Form.Label style={{ marginBottom: "0px" }}>People</Form.Label>
              <Form.Text className="text-muted" style={{ marginBottom: "8px" }}>
                Which roommates are attending?
              </Form.Text>
              {/* <Form.Check
                type="checkbox"
                id="All"
                label="Select All"
                value={this.state.allUsers}
                onChange={this.toggleAllUsers}
              /> */}
              {this.props.users
                .sort((a, b) => {
                  var aFirst = a.first_name.toString();
                  var bFirst = b.first_name.toString();
                  if (aFirst.toLowerCase() > bFirst.toLowerCase()) {
                    return 1;
                  } else if (aFirst.toLowerCase() === bFirst.toLowerCase()) {
                    for (var i = 0; i < aFirst.length; i++) {
                      if (aFirst.charAt(i) > bFirst.charAt(i)) {
                        return 1;
                      } else if (aFirst.charAt(i) < bFirst.charAt(i)) {
                        return -1;
                      }
                    }
                    return a.last_name.toString().toLowerCase() >
                      b.last_name.toString().toLowerCase()
                      ? 1
                      : -1;
                  } else {
                    return -1;
                  }
                })
                .map(user => {
                  var name = user.first_name + " " + user.last_name;
                  return (
                    <Form.Check
                      type="checkbox"
                      id={user}
                      label={name}
                      value={name}
                      onChange={this.props.updatePeople}
                      // checked={this.state.allUsers}
                    />
                  );
                })}
            </Form.Group>            
            <button onClick={this.onClose} className="modal-custom-button">
              Cancel
            </button>
            <input
              type="submit"
              onClick={this.handleDisableClick}
              className="modal-custom-button"
              value="Add"
            />
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}