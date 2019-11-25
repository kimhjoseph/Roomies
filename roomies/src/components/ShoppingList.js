import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

import NavbarComponent from "./NavbarComponent";
import ShoppingListAddItemModal from "./ShoppingListAddItemModal";

import "./ShoppingList.css";

export default class ShoppingList extends Component {
  constructor(props) {
    super(props);

    this.showAddItemModal = this.showAddItemModal.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleItemClicked = this.handleItemClicked.bind(this);
    this.handleDisableClick = this.handleDisableClick.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.updatePeople = this.updatePeople.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
    this.updateCost = this.updateCost.bind(this);
    this.roundCost = this.roundCost.bind(this);

    this.state = {
      addItemModal: false,
      items: [
        {
          item: "Bananas",
          people: ["Joe"],
          notes: "3 green ones pls",
          charge: false,
          cost: null
        },
        {
          item: "Paper Towels",
          people: ["Joe", "Mike", "Saman"],
          notes: "roll up",
          charge: false,
          cost: null
        },
        {
          item: "Gum",
          people: ["Joe", "Mike", "Saman"],
          notes: "gum not gun",
          charge: false,
          cost: null
        },
        {
          item: "Bananas",
          people: ["Mike"],
          notes: "3 green ones but less green pls",
          charge: false,
          cost: null
        },
        {
          item: "Bananas",
          people: ["Saman"],
          notes: "3 yellow ones pls",
          charge: false,
          cost: null
        },
        {
          item: "Apples",
          people: ["Zach"],
          notes: "3 green ones pls",
          charge: true,
          cost: null
        }
      ],
      tempItem: {
        item: "",
        people: "",
        notes: "",
        charge: false,
        cost: null
      }
    };
  }

  showAddItemModal() {
    this.setState({ addItemModal: !this.state.addItemModal });
  }

  handleAddItem(tempItem) {
    console.log("called handleAddItem");
    console.log(tempItem);
    this.setState(currentState => {
      return {
        items: currentState.items.concat([
          {
            item: tempItem.item,
            people: tempItem.people.split(",").map(s => s.trim()),
            notes: tempItem.notes,
            charge: false,
            cost: tempItem.cost
          }
        ]),
        tempItem: {
          item: "",
          people: "",
          notes: "",
          charge: false,
          cost: null
        }
      };
    });
    console.log(this.state.items);
  }

  handleItemClicked(item) {
    console.log(item);
    var newItems = this.state.items.slice();
    var toCharge = newItems.find(i => i == item);
    toCharge.charge = !toCharge.charge;
    this.setState({
      items: newItems
    });
    console.log(item);
  }

  handleDisableClick = e => {
    e.stopPropagation();
    e.preventDefault();
  };

  updateItem(e) {
    const value = e.target.value;
    console.log(value);
    this.setState({
      tempItem: {
        item: value,
        people: this.state.tempItem.people,
        notes: this.state.tempItem.notes,
        charge: this.state.tempItem.charge,
        cost: this.state.tempItem.cost
      }
    });
    console.log(this.state.tempItem);
  }

  updatePeople(e) {
    const value = e.target.value;
    console.log(value);
    this.setState({
      tempItem: {
        item: this.state.tempItem.item,
        people: value,
        notes: this.state.tempItem.notes,
        charge: this.state.tempItem.charge,
        cost: this.state.tempItem.cost
      }
    });
    console.log(this.state.tempItem);
  }

  updateNotes(e) {
    const value = e.target.value;
    console.log(value);
    this.setState({
      tempItem: {
        item: this.state.tempItem.item,
        people: this.state.tempItem.people,
        notes: value,
        charge: this.state.tempItem.charge,
        cost: this.state.tempItem.cost
      }
    });
    console.log(this.state.tempItem);
  }

  updateCost = (key, val) => {
    console.log(key + " " + val);
    this.setState({
      items: this.state.items.map(item =>
        item.item + " " + item.people.join(", ") === key
          ? { ...item, cost: val }
          : item
      )
    });
  };

  roundCost = (key, val) => {
    console.log("focus lost: " + key + " " + val);
    this.setState({
      items: this.state.items.map(item =>
        item.item + " " + item.people.join(", ") === key
          ? { ...item, cost: val.toFixed(2) }
          : item
      )
    });
  };

  render() {
    return (
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <NavbarComponent />
        <h1
          style={{ marginTop: "20px", marginBottom: "0px", fontWeight: "800" }}
        >
          Shopping List
        </h1>
        <Container style={{ height: "100%", margin: "0px, 15px" }}>
          <Row style={{ height: "100%", alignContent: "center" }}>
            {/* --------------- To Buy List --------------- */}
            <Col style={{ height: "90%" }}>
              <div className="scrollable">
                <Card style={{ border: "none" }}>
                  <ListGroup variant="flush">
                    {this.state.items
                      .sort((a, b) =>
                        a.item.toString().toLowerCase() >
                        b.item.toString().toLowerCase()
                          ? 1
                          : a.item.toString().toLowerCase() ==
                              b.item.toString().toLowerCase() &&
                            a.people.toString().toLowerCase() >
                              b.people.toString().toLowerCase()
                          ? 1
                          : -1
                      )
                      .map(item => {
                        if (item.charge == false) {
                          return (
                            <ListGroup.Item
                              action
                              onClick={() => this.handleItemClicked(item)}
                              key={item.item + " " + item.people.join(", ")}
                            >
                              <Card.Body as="custom-card-body">
                                <Card.Title>{item.item}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                  {item.people.join(", ")}
                                </Card.Subtitle>
                                <Card.Text>{item.notes}</Card.Text>
                              </Card.Body>
                            </ListGroup.Item>
                          );
                        }
                      })}
                  </ListGroup>
                </Card>
              </div>
              <button onClick={this.showAddItemModal} className="custom-button">
                Add Item
              </button>
            </Col>
            {/* --------------- Charge List --------------- */}
            <Col style={{ height: "90%" }}>
              <div className="scrollable">
                {/* <ChargeList items={this.state.items} /> */}
                <Form>
                  <div>
                    <Card style={{ border: "none" }}>
                      <ListGroup variant="flush">
                        {this.state.items
                          .sort((a, b) =>
                            a.people.toString().toLowerCase() >
                            b.people.toString().toLowerCase()
                              ? 1
                              : a.people.toString().toLowerCase() ==
                                  b.people.toString().toLowerCase() &&
                                a.item.toString().toLowerCase() >
                                  b.item.toString().toLowerCase()
                              ? 1
                              : -1
                          )
                          .map(item => {
                            if (item.charge == true) {
                              return (
                                <ListGroup.Item
                                  action
                                  onClick={() => this.handleItemClicked(item)}
                                  key={item.item + " " + item.people.join(", ")}
                                >
                                  <Card.Body as="custom-card-body">
                                    <span className="price-input-dollar-sign">
                                      $
                                      <input
                                        type="number"
                                        step=".01"
                                        placeholder="0.00"
                                        onClick={this.handleDisableClick}
                                        className="price-input"
                                        value={item.cost}
                                        onChange={e =>
                                          this.updateCost(
                                            item.item +
                                              " " +
                                              item.people.join(", "),
                                            parseFloat(e.target.value)
                                          )
                                        }
                                        onBlur={e =>
                                          this.roundCost(
                                            item.item +
                                              " " +
                                              item.people.join(", "),
                                            parseFloat(e.target.value)
                                          )
                                        }
                                      />
                                    </span>
                                    <Card.Title>
                                      {item.people.join(", ")}
                                    </Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                      {item.item}
                                    </Card.Subtitle>
                                  </Card.Body>
                                </ListGroup.Item>
                              );
                            }
                          })}
                        <ListGroup.Item>
                          <Card.Body as="custom-card-body">
                            <Card.Title style={{ textAlign: "right" }}>
                              Total
                            </Card.Title>
                            <Card.Text style={{ textAlign: "right" }}>
                              <Total items={this.state.items} />
                            </Card.Text>
                          </Card.Body>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </div>
                </Form>
              </div>
              <button className="custom-button">Charge</button>
            </Col>
          </Row>
        </Container>
        <ShoppingListAddItemModal
          onClose={this.showAddItemModal}
          show={this.state.addItemModal}
          handleAddItem={this.handleAddItem}
          tempItem={this.state.tempItem}
          updateItem={this.updateItem}
          updatePeople={this.updatePeople}
          updateNotes={this.updateNotes}
        />
      </div>
    );
  }
}

const Total = ({ items }) => (
  <p>
    $
    {parseFloat(
      items.reduce((sum, i) => {
        if (i.charge == true && i.cost != null) {
          sum += parseFloat(i.cost);
        }
        if (!isNaN(sum)) return sum;
        return 0;
      }, 0)
    ).toFixed(2)}
  </p>
);
