import React, { Component } from "react";
import { Table, Card } from "react-bootstrap";
import dummy from "../images/dummy.jpg";
import "./Chores.css";
import ChoreAddItemModal from "./ChoreModal";

export default class RoomieChoreList extends Component {
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);


    this.showAddChoreModal = this.showAddChoreModal.bind(this);
    this.handleAddChore = this.handleAddChore.bind(this);
    this.updateChore = this.updateChore.bind(this);
    this.updateDays = this.updateDays.bind(this);
    this.updatePerson = this.updatePerson.bind(this);
    this.handleDisableClick = this.handleDisableClick.bind(this);

    this.state = {
      addChoreModal: false,
      chores: [
        {
          chore: "Dishes",
          person: "Rondald",
          days: "5",
          complete: false
        },
        {
          chore: "Trash",
          person: "Audrey",
          days: "2",
          complete: false
        },
        {
          chore: "Pooop",
          person: "Zachary",
          days: "5",
          complete: false
        },
        {
          chore: "Dishes",
          person: "Rondald",
          days: "5",
          complete: false
        },
        {
          chore: "Dishes",
          person: "Rondald",
          days: "5",
          complete: false
        },
        {
          chore: "Dishes",
          person: "Rondald",
          days: "5",
          complete: false
        }
      ],
      tempChore: {
          chore: "",
          person: "",
          days: "",
          complete: false
      }
    };
  }

  click(item) {
    console.log("hi");
    console.log(item);
    var array = this.state.chores;
    var index = array.indexOf(item);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({
        chores: array
      });
  }
  console.log(array);
}

  showAddChoreModal() {
    this.setState({ addChoreModal: !this.state.addChoreModal });
  }

  handleAddChore(tempChore) {
    console.log("called handleChoreItem")
    console.log(tempChore);
    this.setState(currentState => {
      return {
        chores: currentState.chores.concat([
          {
            chore: tempChore.chore,
            person: tempChore.person, 
            days: tempChore.days, 
            complete: tempChore.complete
          }
        ]),
        tempChore: {
          chore: "",
          person: "",
          days: "",
          complete: false
        }
      };
    });
    console.log(this.state.chores);
  }

  updateChore(e) {
    const value = e.target.value;
    console.log(value);
    this.setState({
      tempChore: {
        chore: value, 
        person: this.state.tempChore.person,
        days: this.state.tempChore.days,
        complete: this.state.tempChore.complete
      }
    });
    console.log(this.state.tempChore);

  }

  updateDays(e) {
    const value = e.target.value;
    console.log(value);
    this.setState({
      tempChore: {
        chore: this.state.tempChore.chore, 
        person: this.state.tempChore.person,
        days: value,
        complete: this.state.tempChore.complete
      }
    });
    console.log(this.state.tempChore);

  }

  updatePerson(e) {
    const value = e.target.value;
    this.setState({
      tempChore: {
        chore: this.state.tempChore.chore, 
        person: value,
        days: this.state.tempChore.days,
        complete: this.state.tempChore.complete
      }
    });
    console.log(this.state.tempChore);

  }

  handleDisableClick = e => {
    e.stopPropagation();
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <div className='section-title'>Roomie Chores</div>
        <Card className='chore-card' style={{marginTop: '5%'}}>
          <Table hover borderless className="chore-table">
            <thead>
              <tr className="chore-header">
                <th>Chore</th>
                <th>Days Left</th>
                <th>Assigned To</th>
              </tr>
            </thead>
            <tbody
            >{this.state.chores
              .map(item => {
              return (
                <tr>
                  <td>{item.chore}</td>
                  <td>{item.days} days</td>
                  <td>{item.person}</td>
                </tr>
                )   
            })}
            </tbody>
          </Table>
        </Card>
      </div>
    );
  }
}
