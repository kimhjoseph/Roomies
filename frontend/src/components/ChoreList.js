import React, { Component } from "react";
import { Table, Card, Container, Row, Col } from "react-bootstrap";
import "./Chores.css";
import ChoreAddItemModal from "./ChoreModal";
import axios from "axios";
import NavbarComponent from "./NavbarComponent";

export default class ChoreList extends Component {
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
    this.check = this.check.bind(this);

    this.showAddChoreModal = this.showAddChoreModal.bind(this);
    this.handleAddChore = this.handleAddChore.bind(this);
    this.updateChore = this.updateChore.bind(this);
    this.updateDays = this.updateDays.bind(this);
    this.updatePerson = this.updatePerson.bind(this);
    this.handleDisableClick = this.handleDisableClick.bind(this);
    this.getUser = this.getUser.bind(this);

    this.state = {
      addChoreModal: false,
      user: [],
      users: [],
      tempChore: {
        userName: "",
        description: "",
        days: ""
      },
      hardChore: {
        userName: "Audrey Pham",
        description: "testing",
        days: 10,
        complete: false,
        created: null
      },
      myChores: [],
      allChores: []
    };
  }

  async componentDidMount() {
    await axios
      .get("http://localhost:4000/choreitem/get")
      .then(response => {
        this.setState({ allChores: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });

    await axios
      .get("http://localhost:4000/user/get")
      .then(response => {
        this.setState({ users: response.data });
        this.setState({ user: response.data[2] });
        console.log(this.state.user);
      })
      .catch(function(error) {
        console.log(error);
      });

    await axios
      .post("http://localhost:4000/choreitem/getmyitems", this.state.user)
      .then(response => {
        this.setState({ myChores: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
    console.log(this.state.myChores);
  }

  check() {
    console.log(this.state.user);
  }

  click(item) {
    console.log(item);
    var array = this.state.myChores;
    var index = array.indexOf(item);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({
        myChores: array
      });
    }
    console.log(array);
  }

  showAddChoreModal() {
    this.setState({ addChoreModal: !this.state.addChoreModal });
  }

  handleAddChore(tempChore) {
    this.setState(currentState => {
      return {
        myChores: currentState.myChores.concat([
          {
            description: tempChore.description,
            completed: tempChore.completed,
            user: tempChore.user,
            apartment: tempChore.apartment,
            created: tempChore.created,
            days: tempChore.days
          }
        ]),
        tempChore: {
          userName: "",
          description: "",
          days: ""
        }
      };
    });
    console.log(this.state.tempChore);

    axios
      .post("http://localhost:4000/choreitem/add", tempChore)
      .then(response => {
        console.log(response.data);
        console.log("Successfully added chore.");
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  updateChore(e) {
    const value = e.target.value;
    console.log(value);
    this.setState({
      tempChore: {
        userName: this.state.tempChore.userName,
        description: value,
        days: this.state.tempChore.days
      }
    });
    console.log(this.state.tempChore);
  }

  updateDays(e) {
    const value = e.target.value;
    console.log(value);
    this.setState({
      tempChore: {
        userName: this.state.tempChore.userName,
        description: this.state.tempChore.description,
        days: value
      }
    });
    console.log(this.state.tempChore);
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
    console.log("updated userName");
  }

  handleDisableClick = e => {
    e.stopPropagation();
    e.preventDefault();
  };

  getUser(e) {
    var index = -1;
    var array = this.state.users;
    var user; 
    

    var filteredObj = array.find(function(item, i){
      if(item._id === e){
        index = i;
        return i;
      }
    });

    if(index != -1) {
      user = array[index];
    }
    console.log("user is ", user);
    return (user)
  };

  render() {
    return (
      <div>
        <NavbarComponent />
        <Container style={{ height: "100%", margin: "0px, 15px" }}>
          <Row style={{ height: "100%", alignContent: "center" }}>
            <Col style={{ height: "90%" }}>
              <div className="section-title">
                {this.state.user.first_name} Chores{" "}
              </div>
              <Card className="chore-card" style={{ marginTop: "5%" }}>
                <Table hover borderless className="chore-table">
                  <thead>
                    <tr className="chore-header">
                      <th>Chore</th>
                      <th>Days Left</th>
                      <th>Completed</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.myChores.map(item => {
                      return (
                        <tr>
                          <td>{item.description}</td>
                          <td>{item.days} days</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-default btn-circle"
                              onClick={() => this.click(item)}
                            ></button>
                          </td>
                          <td>{item.created - item.days}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card>

              <button onClick={this.showAddChoreModal} className="chore-button">
                Add Chore
              </button>
              <button onClick={this.check} className="chore-button">
                Check
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
              <div className="section-title">Roomie Chores</div>
              <Card className="chore-card" style={{ marginTop: "5%" }}>
                <Table hover borderless className="chore-table">
                  <thead>
                    <tr className="chore-header">
                      <th>Chore</th>
                      <th>Days Left</th>
                      <th>Assigned To</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.allChores.map(item => {
                      if(item.user != this.state.user._id){
                      return (
                        <tr>
                          <td>{item.description}</td>
                          <td>{item.days} days</td>
                          <td>{this.getUser(item.user)}</td>
                        </tr>
                      );
                    }})}
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
