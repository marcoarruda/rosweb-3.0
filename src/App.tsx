import React from 'react';
import './App.css';

import ConnectionProvider from './store/ConnectionProvider';
import { Toolbar } from 'common/components/toolbar';
import { WorkspaceContextProvider } from 'store/workspace-context';
import { Workspace } from 'common/components/workspace';

function App() {
  return (
    <ConnectionProvider>
      <div className="App">
        <Toolbar />
        <section className="App-section">
          <WorkspaceContextProvider>
            <Workspace />
          </WorkspaceContextProvider>
        </section>
      </div>
    </ConnectionProvider>
  );
}

export default App;
