import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import "./ShoppingListAddItemModal.css";

export default class ShoppingListAddItemModal extends Component {
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
    this.props.handleAddItem(this.props.tempItem);
    this.onClose();
  };

  // toggleAllUsers() {
  //   console.log("toggle all");
  //   this.props.clearPeople();
  //   if (this.state.allUsers === false) {
  //     this.props.users
  //       .sort((a, b) => {
  //         var aFirst = a.first_name.toString();
  //         var bFirst = b.first_name.toString();
  //         if (aFirst.toLowerCase() > bFirst.toLowerCase()) {
  //           return 1;
  //         } else if (aFirst.toLowerCase() === bFirst.toLowerCase()) {
  //           for (var i = 0; i < aFirst.length; i++) {
  //             if (aFirst.charAt(i) > bFirst.charAt(i)) {
  //               return 1;
  //             } else if (aFirst.charAt(i) < bFirst.charAt(i)) {
  //               return -1;
  //             }
  //           }
  //           return a.last_name.toString().toLowerCase() >
  //             b.last_name.toString().toLowerCase()
  //             ? 1
  //             : -1;
  //         } else {
  //           return -1;
  //         }
  //       })
  //       .forEach(async user => {
  //         var name = user.first_name + " " + user.last_name;
  //         await this.props.updatePeople(name);
  //       });
  //   }
  //   this.setState({
  //     allUsers: !this.state.allUsers
  //   });
  // }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.onClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="item">
              <Form.Label style={{ marginBottom: "0px" }}>Item</Form.Label>
              <Form.Text className="text-muted" style={{ marginBottom: "8px" }}>
                Enter the item you wish to add to the list
              </Form.Text>
              <Form.Control
                required
                type="text"
                placeholder="e.g. Bananas"
                value={this.props.tempItem.item}
                onChange={this.props.updateItem}
              />
            </Form.Group>
            <Form.Group controlId="people">
              <Form.Label style={{ marginBottom: "0px" }}>People</Form.Label>
              <Form.Text className="text-muted" style={{ marginBottom: "8px" }}>
                Who is this item for?
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
            <Form.Group controlId="notes">
              <Form.Label style={{ marginBottom: "0px" }}>Notes</Form.Label>
              <Form.Text className="text-muted" style={{ marginBottom: "8px" }}>
                Any additional information?
              </Form.Text>
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
