import React from 'react';
import './App.css';

import ConnectionForm from './components/ConnectionForm';
import ConnectionStatus from './components/ConnectionStatus';

import ConnectionProvider from './store/ConnectionProvider';

function App() {
  return (
    <ConnectionProvider>
      <div className="App">
        <header className="App-header">
          <a href="/" onClick={(event) => event.preventDefault()}>
            ROSWeb 3.0
          </a>
          <div style={{ flexShrink: 1 }}>
            <ConnectionStatus />
          </div>
          <div style={{ flexGrow: 1 }}>
            <ConnectionForm />
          </div>
        </header>
        <section className="App-section"></section>
      </div>
    </ConnectionProvider>
  );
}

export default App;
