import React, { Component } from "react";
import { Table, Card, Button, ToggleButton } from "react-bootstrap";
import dummy from "../images/dummy.jpg";
import "./Chores.css";

export default class ChoreList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div class='section-title'>Your Chores</div>
        <Card className='chore-card' style={{marginTop: '5%'}}>
          <Table hover borderless className="chore-table">
            <thead>
              <tr className="chore-header">
                <th>Chore</th>
                <th>Days Left</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dishes</td>
                <td>3 Days</td>
                <td>
                  <button className="chore-button" type="button" class="btn btn-default btn-circle"><i class="fa fa-check"></i></button>
                </td>
              </tr>
              <tr>
                <td>Trash</td>
                <td>3 Days</td>
                <td>
                  <button className="chore-button" type="button" class="btn btn-default btn-circle"><i class="fa fa-check"></i></button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan="2">Larry the Bird</td>
              </tr>
            </tbody>
          </Table>
        </Card>
      </div>
    );
  }
}