import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";

import "./ShoppingListChargeModal.css";

export default class ShoppingListChargeModal extends Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);

    this.state = {
      show: this.props.show,
      charge: "Charge",
      chargeDisabled: false
    };
  }

  onClose = e => {
    if (e !== undefined) e.preventDefault();
    this.props.onClose();
    this.setState({ chargeDisabled: false, charge: "Charge" });
  };

  handleDisableClick = async e => {
    const stopper = "Charging...";
    this.interval = window.setInterval(() => {
      this.state.charge === "Charge"
        ? this.setState({ chargeDisabled: true, charge: "Charging" })
        : this.state.charge === stopper
        ? this.setState({ chargeDisabled: true, charge: "Charging" })
        : this.setState(currentState => {
            return {
              chargeDisabled: true,
              charge: currentState.charge + "."
            };
          });
    }, 400);
    e.stopPropagation();
    e.preventDefault();
    await this.props.handleChargeItems();
    this.onClose();
    window.clearInterval(this.interval);
    this.setState({ chargeDisabled: false, charge: "Charge" });
  };

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
          <Modal.Title id="contained-modal-title-vcenter">
            Charge Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
            {this.props.chargesByPerson === undefined
              ? null
              : Object.entries(this.props.chargesByPerson).map(
                  ([key, value]) => {
                    return (
                      <ListGroup.Item key={key}>
                        <Card.Body as="custom-card-body">
                          <div className="charge-amount">${value.cost}</div>
                          <Card.Title>{key}</Card.Title>
                        </Card.Body>
                      </ListGroup.Item>
                    );
                  }
                )}
            <ListGroup.Item>
              <Card.Body as="custom-card-body">
                <Card.Title style={{ textAlign: "right" }}>Total</Card.Title>
                <Card.Text style={{ textAlign: "right" }}>
                  $
                  {this.props.chargesByPerson === undefined
                    ? null
                    : parseFloat(
                        Object.values(this.props.chargesByPerson).reduce(
                          (sum, i) => {
                            if (i.cost !== undefined) {
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
          <button onClick={this.onClose} className="modal-custom-charge-button">
            Cancel
          </button>
          <input
            type="submit"
            disabled={this.state.chargeDisabled}
            onClick={this.handleDisableClick}
            className="modal-custom-charge-button"
            value={this.state.charge}
          />
        </Modal.Body>
      </Modal>
    );
  }
}
