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

import axios from "axios";

import NavbarComponent from "./NavbarComponent";
import ShoppingListAddItemModal from "./ShoppingListAddItemModal";
import ShoppingListChargeModal from "./ShoppingListChargeModal";
import LoadingComponent from "./LoadingComponent";

import "./ShoppingList.css";

export default class ShoppingList extends Component {
  constructor(props) {
    super(props);

    this.getItems = this.getItems.bind(this);
    this.getUsers = this.getUsers.bind(this);
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
    this.handleChargeItems = this.handleChargeItems.bind(this);

    this.state = {
      addItemModal: false,
      chargeModal: false,
      items: [],
      tempItem: {
        item: "",
        people: [],
        notes: "",
        itemID: undefined
      },
      chargeList: [],
      chargeListCondensed: {},
      chargesByPerson: {},
      users: [],
      loading: true
    };
  }

  getItems() {
    console.log("Getting items from database...");
    axios
      .get("http://localhost:4000/shoppingitem/get")
      .then(response => {
        console.log("Successfully obtained items from database!");
        console.log(response.data);
        this.setState({ items: response.data, loading: false });
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  }

  getUsers() {
    console.log("Getting users from database...");
    axios
      .get("http://localhost:4000/user/get")
      .then(response => {
        console.log("Successfully obtained users from database!");
        console.log(response.data);
        this.setState({ users: response.data });
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  }

  componentDidMount() {
    this.getItems();
    this.getUsers();
  }

  showAddItemModal() {
    this.setState({ addItemModal: !this.state.addItemModal });
  }

  showChargeModal() {
    if (!this.state.chargeModal === true) this.updateChargesByPerson();
    this.setState({ chargeModal: !this.state.chargeModal });
  }

  handleAddItem = async tempItem => {
    console.log("Adding item...");
    await axios
      .post("http://localhost:4000/shoppingitem/add", tempItem)
      .then(response => {
        console.log(response);
        var concatItem = {
          item: tempItem.item,
          people: tempItem.people,
          notes: tempItem.notes,
          itemID: response.data
        };
        this.setState(currentState => {
          return {
            items: currentState.items.concat([concatItem]),
            tempItem: {
              item: "",
              people: [],
              notes: "",
              itemID: undefined
            }
          };
        });
        console.log("Successfully added item!");
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  };

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
    console.log("Deleting shopping list item...");
    axios
      .delete("http://localhost:4000/shoppingitem/delete/" + item.itemID)
      .then(response => {
        console.log("Successfully deleted shopping list item!");
        var newItems = this.state.items.filter(i => i !== item);
        this.setState({
          items: newItems
        });
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  }

  handleChargeItems = async () => {
    console.log("Charging items...");
    console.log("Getting access token...");
    await axios
      .post("http://localhost:4000/shoppingitem/get_access")
      .then(async response => {
        console.log("Obtained access token!");
        await Object.entries(this.state.chargesByPerson).reduce(
          async (previousPromise, [key, value]) => {
            await previousPromise;
            return new Promise(async (resolve, reject) => {
              await console.log("Sending invoice to " + key + "...");
              let invoiceeName = await key.split(" ");
              let invoicee = await this.state.users.find(
                i =>
                  i.first_name === invoiceeName[0] &&
                  i.last_name === invoiceeName[1]
              );
              var body = {
                access_token: response.data.access_token,
                invoicer: {
                  first_name: "Joseph",
                  last_name: "Kim",
                  email: "jokim@gmail.com"
                },
                invoicee: {
                  first_name: invoicee.first_name,
                  last_name: invoicee.last_name,
                  email: invoicee.email
                },
                amount: value
              };
              console.log(body);
              await axios
                .post("http://localhost:4000/shoppingitem/send_invoice", body)
                .then(async response => {
                  await console.log(
                    "Successfully sent invoice to " + key + "!"
                  );
                  await resolve();
                })
                .catch(error => {
                  reject();
                });
            });
          },
          Promise.resolve()
        );
      })
      .then(async () => {
        console.log("Successfully charged items!");
        this.handleClearChargeList();
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  };

  handleClearChargeList = async () => {
    console.log("Clearing charge list...");
    this.state.chargeList.forEach(item => {
      axios
        .delete("http://localhost:4000/shoppingitem/delete/" + item.itemID)
        .then(response => {
          console.log("Successfully deleted item!");
          console.log(item);
        })
        .catch(error => {
          console.log("Error: " + error);
        });
    });
    console.log("Successfully cleared charge list!");
    this.setState({
      chargeList: [],
      chargeListCondensed: {}
    });
  };

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
        notes: this.state.tempItem.notes,
        itemID: this.state.tempItem.itemID
      }
    });
  }

  updatePeople(e) {
    console.log("Updating new item people...");
    const person = e.target.value;
    var found = this.state.tempItem.people.find(i => i === person);
    var people;
    if (found === undefined) {
      people = this.state.tempItem.people.concat([person]);
    } else {
      people = this.state.tempItem.people.filter(i => i !== person);
    }
    this.setState({
      tempItem: {
        item: this.state.tempItem.item,
        people: people.sort(),
        notes: this.state.tempItem.notes,
        itemID: this.state.tempItem.itemID
      }
    });
    console.log(people);
    console.log("Successfully updated new item people!");
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
    const sortedMap = {};
    Object.keys(map)
      .sort()
      .forEach(key => {
        sortedMap[key] = map[key];
      });
    this.setState({
      chargeListCondensed: sortedMap
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
      return null;
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
                    {this.state.loading === false ? (
                      this.state.items
                        .sort((a, b) => {
                          var aStr = a.item.toString();
                          var bStr = b.item.toString();
                          if (aStr.toLowerCase() > bStr.toLowerCase()) {
                            return 1;
                          } else if (
                            aStr.toLowerCase() === bStr.toLowerCase()
                          ) {
                            for (var i = 0; i < aStr.length; i++) {
                              if (aStr.charAt(i) > bStr.charAt(i)) {
                                return 1;
                              } else if (aStr.charAt(i) < bStr.charAt(i)) {
                                return -1;
                              }
                            }
                            return a.people.toString().toLowerCase() >
                              b.people.toString().toLowerCase()
                              ? 1
                              : -1;
                          } else {
                            return -1;
                          }
                        })
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
                                <Card.Subtitle
                                  className="mb-2 text-muted"
                                  style={{ fontSize: "14px" }}
                                >
                                  {item.people.join(", ")}
                                </Card.Subtitle>
                                {item.notes.length > 0 ? (
                                  <Card.Text style={{ fontSize: "14px" }}>
                                    {item.notes}
                                  </Card.Text>
                                ) : null}
                              </Card.Body>
                            </ListGroup.Item>
                          );
                        })
                    ) : (
                      <ListGroup.Item>
                        <Card.Body>
                          <LoadingComponent />
                        </Card.Body>
                      </ListGroup.Item>
                    )}
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
                                <Card.Body
                                  as="custom-card-body"
                                  style={{ fontSize: "14px" }}
                                >
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
                                    style={{
                                      margin: "0px 0px 6px 0px"
                                    }}
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
                                  if (i.cost !== undefined) {
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
          users={this.state.users}
        />
        <ShoppingListChargeModal
          onClose={this.showChargeModal}
          show={this.state.chargeModal}
          handleChargeItems={this.handleChargeItems}
          chargeListCondensed={this.state.chargeListCondensed}
          chargesByPerson={this.state.chargesByPerson}
        />
      </div>
    );
  }
}
