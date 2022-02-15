import { ConnectionForm } from './connection-form';
import { ConnectionStatus } from './connection-status';

export const Toolbar = () => {
  return (
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
  );
};
