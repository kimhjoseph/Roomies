import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import "./ToBuyList.css";

export default class ToBuyList extends Component {
  constructor(props) {
    super(props);

    this.onClickListItem = this.onClickListItem.bind(this);
  }

  onClickListItem() {}

  render() {
    return (
      <div>
        <Card style={{ border: "none" }}>
          <ListGroup variant="flush">
            {this.props.items.map(item => (
              <ListGroup.Item action key={item.item}>
                <Card.Body as="custom-card-body">
                  <Card.Title>{item.item}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {item.people}
                  </Card.Subtitle>
                  <Card.Text>{item.notes}</Card.Text>
                </Card.Body>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      </div>
    );
  }
}
