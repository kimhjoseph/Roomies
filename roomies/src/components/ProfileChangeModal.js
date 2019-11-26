import React, {Component} from "react";
import {Table, Card, Button, ToggleButton, Modal, ButtonToolbar, Form} from "react-bootstrap";


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
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder={this.props.userInfo.name}
            value={this.props.newInfo.name}
            onChange={this.props.updateName}
            />
          <Form.Text className="text-muted">
            Enter Your Full Name
          </Form.Text>
        </Form.Group>
        <Button onClick={this.handleDisableClick} variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="secondary" type="leave group" >
          Leave Apartment
        </Button>
        </Form>
              </Modal.Body>
            </Modal>
          );
        }
}
