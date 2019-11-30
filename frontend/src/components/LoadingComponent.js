import React, { Component } from "react";
import Card from "react-bootstrap/Card";

export default class LoadingComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "Loading"
    };
  }

  // loading animation
  componentDidMount() {
    const stopper = this.state.text + "...";

    this.interval = window.setInterval(() => {
      this.state.text === stopper
        ? this.setState({ text: "Loading" })
        : this.setState(currentState => {
            return {
              text: currentState.text + "."
            };
          });
    }, 200);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return <Card.Title>{this.state.text}</Card.Title>;
  }
}
