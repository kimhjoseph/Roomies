import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";

import "./ShoppingListChargeModal.css";

export default class ShoppingListChargeModal extends Component {
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
    this.props.handleClearChargeList();
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
          <Modal.Title id="contained-modal-title-vcenter">
            Charge Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
            {this.props.chargeListCondensed === undefined
              ? null
              : Object.entries(this.props.chargeListCondensed).map(
                  ([key, value]) => {
                    return (
                      <ListGroup.Item key={key}>
                        <Card.Body as="custom-card-body">
                          {value.cost}
                          <Card.Title>{key}</Card.Title>
                          {value.items.map(item => (
                            <Card.Subtitle>{item.item}</Card.Subtitle>
                          ))}
                        </Card.Body>
                      </ListGroup.Item>
                    );
                  }
                )}
            <ListGroup.Item>
              <Card.Body as="custom-card-body">
                <Card.Title style={{ textAlign: "right" }}>Total</Card.Title>
                <Card.Text style={{ textAlign: "right" }}>
                  ${console.log(this.props.chargeListCondensed)}
                  {this.props.chargeListCondensed === undefined
                    ? null
                    : parseFloat(
                        Object.values(this.props.chargeListCondensed).reduce(
                          (sum, i) => {
                            if (i.cost != undefined) {
                              sum += parseFloat(i.cost);
                            }
                            if (!isNaN(sum)) return sum;
                            return 0;
                          },
                          0
                        )
                      ).toFixed(2)}
                </Card.Text>
              </Card.Body>
            </ListGroup.Item>
          </ListGroup>
          <button onClick={this.onClose} className="modal-custom-button">
            Cancel
          </button>
          <input
            type="submit"
            onClick={this.handleDisableClick}
            className="modal-custom-button"
            value="Charge"
          />
        </Modal.Body>
      </Modal>
    );
  }
}
