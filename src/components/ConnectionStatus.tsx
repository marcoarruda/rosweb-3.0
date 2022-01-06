import React, { useContext } from "react";

import ConnectionContext from '../store/ConnectionContext'

function ConnectionStatus() {
  const connCtx = useContext(ConnectionContext)

  const statusText = connCtx.isConnected ? <span style={{ color: "green" }}>On</span> : <span style={{ color: "red" }}>Off</span>

  return (
    <div style={{ padding: '0 20px' }}>
      { statusText }
    </div>
  );
}

export default ConnectionStatus;