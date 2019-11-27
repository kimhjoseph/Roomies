import React, { Component } from "react";
import { Form, Modal } from "react-bootstrap";
import dummy from "../images/dummy.jpg";
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
          <Modal.Title id="contained-modal-title-vcenter">Add New Chore</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="chore">
              <Form.Label>Chore Item</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="e.g. Dishes"
                value={this.props.tempChore.chore}
                onChange={this.props.updateChore}
              />
            </Form.Group>
            <Form.Group controlId="days">
              <Form.Label>Days to Complete</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="e.g. 7"
                value={this.props.tempChore.days}
                onChange={this.props.updateDays}
              />
            </Form.Group>
            <Form.Group controlId="person">
              <Form.Label>Assign Chore to</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="e.g. Rondald"
                value={this.props.tempChore.person}
                onChange={this.props.updatePerson}
              />
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
