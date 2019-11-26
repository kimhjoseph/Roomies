import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faTimesCircle,
  faMinusCircle
} from "@fortawesome/free-solid-svg-icons";

import NavbarComponent from "./NavbarComponent";
import ShoppingListAddItemModal from "./ShoppingListAddItemModal";
import ShoppingListChargeModal from "./ShoppingListChargeModal";

import "./ShoppingList.css";

export default class ShoppingList extends Component {
  constructor(props) {
    super(props);

    this.showAddItemModal = this.showAddItemModal.bind(this);
    this.showChargeModal = this.showChargeModal.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleDisableClick = this.handleDisableClick.bind(this);
    this.handleClearChargeList = this.handleClearChargeList.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.updatePeople = this.updatePeople.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
    this.updateCost = this.updateCost.bind(this);
    this.roundCost = this.roundCost.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.updateChargesByPerson = this.updateChargesByPerson.bind(this);

    this.state = {
      addItemModal: false,
      chargeModal: false,
      items: [
        {
          item: "Bananas",
          people: ["Joe"],
          notes: "3 green ones pls"
        },
        {
          item: "Paper Towels",
          people: ["Joe", "Mike", "Saman"],
          notes: "roll up"
        },
        {
          item: "Gum",
          people: ["Joe", "Mike", "Saman"],
          notes: "gum not gun"
        },
        {
          item: "Bananas",
          people: ["Mike"],
          notes: "3 green ones but less green pls"
        },
        {
          item: "Bananas",
          people: ["Saman"],
          notes: "3 yellow ones pls"
        },
        {
          item: "Apples",
          people: ["Zach"],
          notes: "3 green ones pls"
        }
      ],
      tempItem: {
        item: "",
        people: "",
        notes: "",
        charge: false,
        cost: undefined
      },
      chargeList: [],
      chargeListCondensed: {},
      chargesByPerson: {}
    };
  }

  showAddItemModal() {
    this.setState({ addItemModal: !this.state.addItemModal });
  }

  showChargeModal() {
    if (!this.state.chargeModal === true) this.updateChargesByPerson();
    this.setState({ chargeModal: !this.state.chargeModal });
  }

  handleAddItem(tempItem) {
    this.setState(currentState => {
      return {
        items: currentState.items.concat([
          {
            item: tempItem.item,
            people: tempItem.people.split(",").map(s => s.trim()),
            notes: tempItem.notes
          }
        ]),
        tempItem: {
          item: "",
          people: "",
          notes: ""
        }
      };
    });
  }

  handleTransferToCharge(item) {
    var newItems = this.state.items.filter(i => i !== item);
    var toCharge = this.state.items.find(i => i === item);
    var newCharge = this.state.chargeList.concat([toCharge]);
    this.updateChargeListCondensed(newItems, newCharge);
    this.setState({
      items: newItems,
      chargeList: newCharge
    });
  }

  handleTransferToBuy(item) {
    var newCharge = this.state.chargeList.filter(i => i !== item);
    var toBuy = this.state.chargeList.find(i => i === item);
    var newItems = this.state.items.concat([toBuy]);
    this.updateChargeListCondensed(newItems, newCharge);
    this.setState({
      items: newItems,
      chargeList: newCharge
    });
  }

  handleRemoveItem(item) {
    var newItems = this.state.items.filter(i => i !== item);
    this.setState({
      items: newItems
    });
  }

  handleClearChargeList() {
    this.setState({
      chargeList: [],
      chargeListCondensed: {}
    });
  }

  handleDisableClick = e => {
    e.stopPropagation();
    e.preventDefault();
  };

  updateItem(e) {
    const value = e.target.value;
    this.setState({
      tempItem: {
        item: value,
        people: this.state.tempItem.people,
        notes: this.state.tempItem.notes
      }
    });
  }

  updatePeople(e) {
    const value = e.target.value;
    this.setState({
      tempItem: {
        item: this.state.tempItem.item,
        people: value,
        notes: this.state.tempItem.notes
      }
    });
  }

  updateNotes(e) {
    const value = e.target.value;
    this.setState({
      tempItem: {
        item: this.state.tempItem.item,
        people: this.state.tempItem.people,
        notes: value
      }
    });
  }

  updateCost = (key, val) => {
    let items = this.state.chargeListCondensed;
    items[key].cost = val;
    this.setState({
      chargeListCondensed: items
    });
  };

  roundCost = (key, val) => {
    let items = this.state.chargeListCondensed;
    items[key].cost = val.toFixed(2);
    this.setState({
      chargeListCondensed: items
    });
  };

  updateChargeListCondensed(items, chargeList) {
    var map = this.state.chargeListCondensed;
    chargeList.forEach(item => {
      var key = item.people.join(", ");
      // people group exists, add item to group
      if (key in map) {
        if (!map[key].items.includes(item)) map[key].items.push(item);
      } else {
        // new group of people, add new entry
        map[key] = { items: [item], cost: undefined };
      }
    });
    items.forEach(item => {
      var key = item.people.join(", ");
      if (key in map) {
        if (map[key].items.includes(item))
          map[key].items = map[key].items.filter(i => i !== item);
        if (map[key].items === undefined || map[key].items.length === 0)
          delete map[key];
      }
    });
    this.setState({
      chargeListCondensed: map
    });
  }

  updateChargesByPerson() {
    var map = {};
    Object.entries(this.state.chargeListCondensed).map(([key, value]) => {
      var people = key.split(", ");
      // more than one person
      if (people.length > 1 && value.cost !== undefined) {
        console.log(key);
        var divided = parseFloat(value.cost) / people.length;
        divided = parseFloat(divided).toFixed(2);
        people.forEach(person => {
          console.log(person);
          if (map[person] !== undefined && map[person].cost !== undefined) {
            var newCost = parseFloat(map[person].cost) + parseFloat(divided);
            newCost = parseFloat(newCost).toFixed(2);
            map[person] = { cost: newCost };
          } else {
            map[person] = { cost: divided };
          }
        });
      }
      // one person
      else if (value.cost !== undefined) {
        console.log(key);
        var newCost = value.cost;
        if (map[people[0]] !== undefined && map[people[0]].cost !== undefined) {
          var oldCost = parseFloat(map[people[0]].cost);
          newCost = parseFloat(newCost) + oldCost;
        }
        newCost = parseFloat(newCost).toFixed(2);
        map[people[0]] = { cost: newCost };
      }
    });
    this.setState({
      chargesByPerson: map
    });
  }

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
                          : a.item.toString().toLowerCase() ===
                              b.item.toString().toLowerCase() &&
                            a.people.toString().toLowerCase() >
                              b.people.toString().toLowerCase()
                          ? 1
                          : -1
                      )
                      .map(item => {
                        return (
                          <ListGroup.Item
                            key={item.item + " " + item.people.join(", ")}
                          >
                            <Card.Body as="custom-card-body">
                              <div className="edit-functions">
                                <FontAwesomeIcon
                                  icon={faPlusCircle}
                                  className="edit-button"
                                  onClick={() =>
                                    this.handleTransferToCharge(item)
                                  }
                                />
                                <FontAwesomeIcon
                                  icon={faTimesCircle}
                                  className="edit-button"
                                  onClick={() => this.handleRemoveItem(item)}
                                />
                              </div>
                              <Card.Title>{item.item}</Card.Title>
                              <Card.Subtitle className="mb-2 text-muted">
                                {item.people.join(", ")}
                              </Card.Subtitle>
                              {item.notes.length > 0 ? (
                                <Card.Text>{item.notes}</Card.Text>
                              ) : null}
                            </Card.Body>
                          </ListGroup.Item>
                        );
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
                        {Object.entries(this.state.chargeListCondensed).map(
                          ([key, value]) => {
                            return (
                              <ListGroup.Item key={key}>
                                <Card.Body as="custom-card-body">
                                  <span className="price-input-dollar-sign">
                                    $
                                    <input
                                      required
                                      type="number"
                                      step=".01"
                                      placeholder="0.00"
                                      onClick={this.handleDisableClick}
                                      className="price-input"
                                      value={value.cost}
                                      onChange={e =>
                                        this.updateCost(
                                          key,
                                          parseFloat(e.target.value)
                                        )
                                      }
                                      onBlur={e =>
                                        this.roundCost(
                                          key,
                                          parseFloat(e.target.value)
                                        )
                                      }
                                    />
                                  </span>
                                  <Card.Title
                                    style={{ margin: "0px 0px 6px 0px" }}
                                  >
                                    {key}
                                  </Card.Title>
                                  {value.items.map(item => (
                                    <div
                                      className="item-entry"
                                      onClick={() =>
                                        this.handleTransferToBuy(item)
                                      }
                                    >
                                      <FontAwesomeIcon
                                        icon={faMinusCircle}
                                        className="edit-button"
                                      />
                                      <div className="custom-card-subtitle">
                                        {item.item}
                                      </div>
                                    </div>
                                  ))}
                                </Card.Body>
                              </ListGroup.Item>
                            );
                          }
                        )}
                        <ListGroup.Item>
                          <Card.Body as="custom-card-body">
                            <Card.Title style={{ textAlign: "right" }}>
                              Total
                            </Card.Title>
                            <Card.Text style={{ textAlign: "right" }}>
                              $
                              {parseFloat(
                                Object.values(
                                  this.state.chargeListCondensed
                                ).reduce((sum, i) => {
                                  if (i.cost != undefined) {
                                    sum += parseFloat(i.cost);
                                  }
                                  if (!isNaN(sum)) return sum;
                                  return 0;
                                }, 0)
                              ).toFixed(2)}
                            </Card.Text>
                          </Card.Body>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </div>
                </Form>
              </div>
              <button onClick={this.showChargeModal} className="custom-button">
                Charge
              </button>
              {/* <input
                type="submit"
                onClick={this.handleClearChargeList}
                className="custom-button"
                value="Charge"
              /> */}
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
        <ShoppingListChargeModal
          onClose={this.showChargeModal}
          show={this.state.chargeModal}
          handleClearChargeList={this.handleClearChargeList}
          chargeListCondensed={this.state.chargeListCondensed}
          chargesByPerson={this.state.chargesByPerson}
        />
      </div>
    );
  }
}
