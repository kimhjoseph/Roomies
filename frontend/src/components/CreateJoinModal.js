import React, { Component } from "react";
import { Form, Modal } from "react-bootstrap";
import "./Chores.css";

export default class CreateJoinModal extends Component {
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
    this.props.handleContinue();
    this.onClose();
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.onClose}
        onSubmit={() => this.props.handleContinue()}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            New Group Created!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h4>Invite your roomies with this code!</h4>
        <p>
          {this.props.code}
        </p>
        <button className="custom-landing-button" onClick={this.handleDisableClick}>Continue to Roomies!</button>
        </Modal.Body>
      </Modal>
    );
  }
}
