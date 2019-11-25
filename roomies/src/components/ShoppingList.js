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
    // this.handleItemClicked = this.handleItemClicked.bind(this);
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
          cost: undefined
        },
        {
          item: "Paper Towels",
          people: ["Joe", "Mike", "Saman"],
          notes: "roll up",
          charge: false,
          cost: undefined
        },
        {
          item: "Gum",
          people: ["Joe", "Mike", "Saman"],
          notes: "gum not gun",
          charge: false,
          cost: undefined
        },
        {
          item: "Bananas",
          people: ["Mike"],
          notes: "3 green ones but less green pls",
          charge: false,
          cost: undefined
        },
        {
          item: "Bananas",
          people: ["Saman"],
          notes: "3 yellow ones pls",
          charge: false,
          cost: undefined
        },
        {
          item: "Apples",
          people: ["Zach"],
          notes: "3 green ones pls",
          charge: false,
          cost: undefined
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
      chargeListCondensed: {}
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
          cost: undefined
        }
      };
    });
    console.log(this.state.items);
  }

  // handleItemClicked(item) {
  //   var newItems = this.state.items.slice();
  //   var toCharge = newItems.find(i => i === item);
  //   toCharge.charge = !toCharge.charge;
  //   this.setState({
  //     items: newItems
  //   });
  //   // this.updateChargeList();
  // }

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

  // updateCost = (key, val) => {
  //   console.log(key + " " + val);
  //   this.setState({
  //     items: this.state.items.map(item =>
  //       item.item + " " + item.people.join(", ") === key
  //         ? { ...item, cost: val }
  //         : item
  //     )
  //   });
  // };

  updateCost = (key, val) => {
    console.log(key + " " + val);
    // // 1. Make a shallow copy of the items
    // let items = [...this.state.chargeListCondensed];
    // // 2. Make a shallow copy of the item you want to mutate
    // let item = { ...items[key] };
    // // 3. Replace the property you're intested in
    // item.cost = val;
    // // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    // items[key] = item;
    // // 5. Set the state to our new copy
    // this.setState({
    //   chargeListCondensed: items
    // });

    let items = this.state.chargeListCondensed;
    items[key].cost = val;
    this.setState({
      chargeListCondensed: items
    });

    // this.setState(prevState => ({
    //   chargeListCondensed: {
    //     ...prevState.chargeListCondensed,
    //     [prevState.chargeListCondensed[key].cost]: val
    //   }
    // }));
  };

  // roundCost = (key, val) => {
  //   console.log("focus lost: " + key + " " + val);
  //   this.setState({
  //     items: this.state.items.map(item =>
  //       item.item + " " + item.people.join(", ") === key
  //         ? { ...item, cost: val.toFixed(2) }
  //         : item
  //     )
  //   });
  // };

  roundCost = (key, val) => {
    console.log("focus lost: " + key + " " + val);
    let items = this.state.chargeListCondensed;
    items[key].cost = val.toFixed(2);
    this.setState({
      chargeListCondensed: items
    });
    // this.setState(prevState => ({
    //   chargeListCondensed: {
    //     ...prevState.chargeListCondensed,
    //     [prevState.chargeListCondensed[key].cost]: val.toFixed(2)
    //   }
    // }));
  };

  updateChargeListCondensed(items, chargeList) {
    chargeList.forEach(item => {
      var key = item.people.join(", ");
      // people group exists, add item to group
      var map = this.state.chargeListCondensed;
      if (key in this.state.chargeListCondensed) {
        if (!map[key].items.includes(item)) map[key].items.push(item);
        this.setState({
          chargeListCondensed: map
        });
      } else {
        // new group of people, add new entry
        map[key] = { items: [item], cost: undefined };
        this.setState({
          chargeListCondensed: map
        });
      }
    });
    items.forEach(item => {
      var key = item.people.join(", ");
      if (key in this.state.chargeListCondensed) {
        var map = this.state.chargeListCondensed;
        if (map[key].items.includes(item))
          map[key].items = map[key].items.filter(i => i !== item);
        if (map[key].items === undefined || map[key].items.length === 0)
          delete map[key];
        this.setState({
          chargeListCondensed: map
        });
      }
    });
    console.log(this.state.chargeListCondensed);
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
                            action
                            onClick={() => this.handleTransferToCharge(item)}
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
                                  <Card.Title>{key}</Card.Title>
                                  {console.log(this.state.chargeListCondensed)}
                                  {value.items.map(item => (
                                    <Card.Subtitle
                                      action
                                      onClick={() =>
                                        this.handleTransferToBuy(item)
                                      }
                                      className="mb-2 text-muted"
                                    >
                                      {item.item}
                                    </Card.Subtitle>
                                  ))}
                                </Card.Body>
                              </ListGroup.Item>
                            );
                          }
                        )}
                        {/* {this.state.chargeList
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
                            console.log(item);
                            return (
                              <ListGroup.Item
                                action
                                onClick={() => this.handleTransferToBuy(item)}
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
                          })} */}
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
