import React, { Component } from "react";
import io from "socket.io-client";

class App extends Component {
  constructor(props) {
    super(props);
    const socket = null;
    this.state = {
      response: null,
      endpoint: "http://localhost:4000"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    this.socket = io(endpoint);
    //listen to events from server
    this.socket.on("data-client", data => this.setState({ response: data }));
  }

  handleSendToServer = () => {
    //emit events for server
    this.socket.emit("data-server", "Hi Server");
  };

  render() {
    const { response } = this.state;

    return (
      <div>
        <p>{response}</p>
        <button onClick={this.handleSendToServer}>Send</button>
      </div>
    );
  }
}

export default App;
