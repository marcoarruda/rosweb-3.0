import React from 'react';
import './App.css';

import ConnectionProvider from './store/ConnectionProvider';
import { Toolbar } from 'common/components/toolbar';

function App() {
  return (
    <ConnectionProvider>
      <div className="App">
        <Toolbar />
        <section className="App-section"></section>
      </div>
    </ConnectionProvider>
  );
}

export default App;
