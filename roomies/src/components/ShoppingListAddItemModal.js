import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import "./ShoppingListAddItemModal.css";

export default class ShoppingListAddItemModal extends Component {
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
    this.props.handleAddItem(this.props.tempItem);
    this.onClose();
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.onClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="item">
              <Form.Label>Item</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="e.g. Bananas"
                value={this.props.tempItem.item}
                onChange={this.props.updateItem}
              />
              <Form.Text className="text-muted">
                Enter the item you wish to add to the list
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="people">
              <Form.Label>People</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="e.g. John Doe, Rondald Rondaldson, ..."
                value={this.props.tempItem.people}
                onChange={this.props.updatePeople}
              />
              <Form.Text className="text-muted">
                Who is this item for? (comma separated)
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="notes">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows="2"
                placeholder="e.g. 3 of the greenest bananas!"
                value={this.props.tempItem.notes}
                onChange={this.props.updateNotes}
              />
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
