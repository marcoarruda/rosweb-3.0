import React from "react";
import "./App.css";

import Connector from "./components/Connector";
import ConnectionStatus from "./components/ConnectionStatus"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a href="/" onClick={(event) => event.preventDefault()}>
          ROSWeb 3.0
        </a>
        <div style={{ flexShrink: 1 }}>
          <ConnectionStatus />
        </div>
        <div style={{ flexGrow: 1 }}>
          <Connector />
        </div>
      </header>
      <section className="App-section"></section>
    </div>
  );
}

export default App;
