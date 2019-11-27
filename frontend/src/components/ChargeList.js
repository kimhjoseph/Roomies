import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./ChargeList.css";

export default class ChargeList extends Component {
  constructor(props) {
    super(props);

    this.onAddCost = this.onAddCost.bind(this);

    this.state = {
      total: 0
    };
  }

  onAddCost(e) {
    this.setState(prevState => {
      return { total: prevState.total + e.target.value };
    });
  }

  render() {
    return (
      <div>
        <Form>
          <div>
            <Card style={{ border: "none" }}>
              <ListGroup variant="flush">
                {this.props.items.map(item => (
                  <ListGroup.Item action key={item.item}>
                    <Card.Body as="custom-card-body">
                      <Form.Control
                        type="text"
                        placeholder="$0.00"
                        style={{
                          width: "18%",
                          float: "right",
                          border: "none",
                          padding: "0px",
                          textAlign: "right"
                        }}
                      />
                      <Card.Title>{item.people}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {item.item}
                      </Card.Subtitle>
                    </Card.Body>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <Card.Body as="custom-card-body">
                    <Card.Title style={{ textAlign: "right" }}>
                      Total
                    </Card.Title>
                    <Card.Text style={{ textAlign: "right" }}>
                      ${this.state.total}
                    </Card.Text>
                  </Card.Body>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </div>
        </Form>
      </div>
    );
  }
}
