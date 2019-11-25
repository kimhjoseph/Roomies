import React, { Component } from "react";
import { Table, Card, Button, ToggleButton, Modal, ButtonToolbar, Form } from "react-bootstrap";
import dummy from "../images/dummy.jpg";
import "./Chores.css";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal class="chore-modal"
      {...props}
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
          <Form.Group controlId="newChore">
            <Form.Label>Chore Item</Form.Label>
            <Form.Control type="text" placeholder="New chore" />
          </Form.Group>
          <Form.Group controlId="daysToComplete">
            <Form.Label>Days to Complete</Form.Label>
            <Form.Control as="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="assignChore">
            <Form.Label>Assign Chore to</Form.Label>
            <Form.Control as="select">
              <option>Rondald</option>
              <option>Zachary</option>
              <option>Sam</option>
            </Form.Control>
          </Form.Group>
          <Button className="chore-button" type="submit">
            Add Chore
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

function ModalButton() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <ButtonToolbar style={{float: 'right', paddingRight: '30px'}}>
      <Button className='chore-button' onClick={() => setModalShow(true)}>
        Add Chore
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </ButtonToolbar>
  );
}

export default ModalButton;