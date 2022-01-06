import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a href="/" onClick={event => event.preventDefault()}>ROSWeb 3.0</a>
      </header>
      <section className="App-section"></section>
    </div>
  );
}

export default App;
