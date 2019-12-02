import React, { Component } from "react";
import { Form, Modal } from "react-bootstrap";

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
        style={{ width: "100%" }}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ fontSize: "30px", color: "#008dc9", fontWeight: "bold" }}
          >
            New Apartment Created!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <h4 className="create-modal" style={{ fontSize: "20px" }}>
            Invite your roomies with this code:
          </h4>
          <p
            style={{
              fontFamily: "Noto Sans",
              fontStyle: "italic",
              fontSize: "20px",
              textAlign: "center",
              marginTop: "25px",
              fontWeight: "800"
            }}
          >
            {this.props.code}
          </p>
          <button className="chore-button" onClick={this.handleDisableClick}>
            Continue to Roomies!
          </button>
        </Modal.Body>
      </Modal>
    );
  }
}
