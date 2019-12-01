import React, { Component } from "react";
import { Table, Card, Container, Row, Col } from "react-bootstrap";
import "./Chores.css";
import ChoreAddItemModal from "./ChoreModal";
import axios from "axios";
import NavbarComponent from "./NavbarComponent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

axios.defaults.withCredentials = true;

export default class ChoreList extends Component {
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);

    this.showAddChoreModal = this.showAddChoreModal.bind(this);
    this.handleAddChore = this.handleAddChore.bind(this);
    this.updateChore = this.updateChore.bind(this);
    this.updateDays = this.updateDays.bind(this);
    this.updatePerson = this.updatePerson.bind(this);
    this.handleDisableClick = this.handleDisableClick.bind(this);
    this.getAllChores = this.getAllChores.bind(this);
    this.getMyChores = this.getMyChores.bind(this);

    this.state = {
      addChoreModal: false,
      user: "",
      users: [],
      tempChore: {
        userName: "",
        description: "",
        days: ""
      },
      myChores: [],
      allChores: []
    };

    axios
      .get("http://localhost:4000/user/get_current_user")
      .then(response => {
        this.setState({ user: response.data});
        console.log(this.state.user);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getAllChores() {
    axios
      .get("http://localhost:4000/choreitem/get_all_items")
      .then(response => {
        this.setState({ allChores: response.data });
        console.log(this.state.allChores);
      })
      .then(response => {
        this.setState({
          allChores: this.state.allChores.sort((a, b) => a.days - b.days)
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getMyChores() {
    axios
      .get("http://localhost:4000/choreitem/get_my_items")
      .then(response => {
        this.setState({ myChores: response.data });
      })
      .then(response => {
        this.setState({
          myChores: this.state.myChores.sort((a, b) => a.days - b.days)
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  async componentDidMount() {
    await axios
      .get("http://localhost:4000/user/get")
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });

    await Promise.all([this.getAllChores(), this.getMyChores()]);
  }

  click(chore) {
    axios
      .delete("http://localhost:4000/choreitem/delete_item/" + chore.id)
      .then(response => {
        var newChores = this.state.myChores.filter(i => i !== chore);
        this.setState({
          myChores: newChores
        });
        var chores = this.state.allChores.filter(i => i !== chore);
        this.setState({
          allChores: chores
        });
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  }

  showAddChoreModal() {
    this.setState({ addChoreModal: !this.state.addChoreModal });
  }

  async handleAddChore(tempChore) {
    await axios
      .post("http://localhost:4000/choreitem/add", tempChore)
      .then(response => {
        console.log("Successfully added chore.");
      })
      .catch(function(error) {
        console.log(error);
      });

    await Promise.all([this.getAllChores(), this.getMyChores()]);
  }

  updateChore(e) {
    const value = e.target.value;
    this.setState({
      tempChore: {
        userName: this.state.tempChore.userName,
        description: value,
        days: this.state.tempChore.days
      }
    });
  }

  updateDays(e) {
    const value = e.target.value;
    this.setState({
      tempChore: {
        userName: this.state.tempChore.userName,
        description: this.state.tempChore.description,
        days: value
      }
    });
  }

  updatePerson(e) {
    const value = e.target.value;
    console.log(value);
    this.setState({
      tempChore: {
        userName: value,
        description: this.state.tempChore.description,
        days: this.state.tempChore.days
      }
    });
  }

  handleDisableClick = e => {
    e.stopPropagation();
    e.preventDefault();
  };

  render() {
    return (
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <NavbarComponent />
        <Container style={{ height: "100%", margin: "0px, 15px" }}>
          <Row style={{ height: "100%", alignContent: "center" }}>
            <Col style={{ height: "90%" }}>
              <div className="chore-section-title">
                {this.state.user.first_name}'s Chores{" "}
              </div>
              <Card className="chore-card" style={{ marginTop: "5%" }}>
                <Table hover borderless className="chore-table">
                  <thead>
                    <tr className="chore-header">
                      <th width="8px" padding="0px"></th>
                      <th>Chore</th>
                      <th>Days Left</th>
                      <th width="8px" padding="0px"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.myChores.map(item => {
                      return (
                        <tr className={item.days <= 0 ? "late" : "on-time"}>
                          <td>
                            <FontAwesomeIcon
                              icon={faTrashAlt}
                              className="edit-button"
                              onClick={() => this.click(item)}
                            />
                          </td>
                          <td>{item.chore}</td>
                          <td>{item.days} days</td>
                          <td>
                            <FontAwesomeIcon
                              icon={faCheckCircle}
                              className="edit-button"
                              onClick={() => this.click(item)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card>

              <button onClick={this.showAddChoreModal} className="chore-button">
                Add Chore
              </button>
              <ChoreAddItemModal
                onClose={this.showAddChoreModal}
                show={this.state.addChoreModal}
                handleAddChore={this.handleAddChore}
                tempChore={this.state.tempChore}
                users={this.state.users}
                updateChore={this.updateChore}
                updateDays={this.updateDays}
                updatePerson={this.updatePerson}
              />
            </Col>
            <Col style={{ height: "90%" }}>
              <div className="chore-section-title">Roomie Chores</div>
              <Card className="chore-card" style={{ marginTop: "5%" }}>
                <Table hover borderless className="chore-table">
                  <thead>
                    <tr className="chore-header">
                      <th width="10px"></th>
                      <th>Chore</th>
                      <th>Days Left</th>
                      <th>Assigned To</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.allChores.map((item, i) => {
                      if (item.user_id != this.state.user._id) {
                        return (
                          <tr className={item.days <= 0 ? "late" : "on-time"}>
                            <td>
                              <FontAwesomeIcon
                                icon={faTrashAlt}
                                className="edit-button"
                                onClick={() => this.click(item)}
                              />
                            </td>
                            <td>{item.chore}</td>
                            <td>{item.days} days</td>
                            <td>{item.user}</td>
                          </tr>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
