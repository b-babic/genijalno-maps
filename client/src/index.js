import React, { Component } from "react";
import ReactDOM from "react-dom";

//Create a class base component.
class App extends Component {
  render() {
    return <div>Werking dva </div>;
  }
}

//Take above jsx component and add or render to the DOM
ReactDOM.render(<App />, document.getElementById("body"));
