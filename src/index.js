import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import { InsurancePicker } from "./insurancePicker/";

function App() {
  return (
    <div className="App">
      <h1>Choose Your Insurance</h1>
      <InsurancePicker />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
