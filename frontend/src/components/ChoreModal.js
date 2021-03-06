import React, { Component } from "react";
import { Form, Modal } from "react-bootstrap";
import "./Chores.css";

export default class ChoreAddItemModal extends Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);

    this.state = {
      show: this.props.show
    };
  }

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  handleDisableClick = e => {
    e.stopPropagation();
    e.preventDefault();
    this.props.handleAddChore(this.props.tempChore);
    this.onClose();
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.onClose}
        onSubmit={() => this.props.handleAddChore(this.props.tempChore)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Chore
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="chore">
              <Form.Label>Chore Item</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="e.g. Dishes"
                onChange={this.props.updateChore}
              />
            </Form.Group>
            <Form.Group controlId="days">
              <Form.Label>Days to Complete</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="e.g. 7"
                onChange={this.props.updateDays}
              />
            </Form.Group>
            <Form.Group controlId="person">
              <Form.Label>Assign Chore to</Form.Label>
              <Form.Control
                as="select"
                onChange={this.props.updatePerson}
              >
                <option value="" disabled selected hidden>
                  Choose a person
                </option>
                {this.props.users.map(item => {
                  return (
                    <option>
                      {item.first_name} {item.last_name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <input
              type="submit"
              onClick={this.handleDisableClick}
              className="modal-custom-button"
              value="Add Chore"
            />
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
