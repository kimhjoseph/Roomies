import React, { Component } from "react";
import { Modal, Form } from "react-bootstrap";

import "./ProfileChangeModal.css";

export default class ProfileChangeModal extends Component {
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
    this.props.handleUpdateInfo(this.props.newInfo);
    this.onClose();
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.onClose}
        onSubmit={() => this.props.handleUpdateInfo(this.props.newInfo)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          Edit Info
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="name"
                placeholder={this.props.userInfo.firstname}
                onChange={this.props.updateFirstName}
              />
              <Form.Text className="text-muted">
                Enter Your New First Name
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="name"
                placeholder={this.props.userInfo.lastname}
                onChange={this.props.updateLastName}
              />
              <Form.Text className="text-muted">
                Enter Your New Last Name
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="name"
                placeholder={this.props.userInfo.email}
                onChange={this.props.updateEmail}
              />
              <Form.Text className="text-muted">Enter Your New Email</Form.Text>
            </Form.Group>
            <button
              onClick={this.handleDisableClick}
              variant="primary"
              type="submit"
              className="profile-change-submit-button"
            >
              Submit
            </button>
            <button
              variant="secondary"
              type="leave group"
              className="leave-apt-button"
            >
              Leave Apartment
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
