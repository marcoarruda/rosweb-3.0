import React, { useContext } from "react";

import ConnectionContext from "../store/ConnectionContext";

function ConnectionForm() {
  const connCtx = useContext(ConnectionContext);
  const connectorOnSubmitHandler = (event: React.FormEvent): any => {
    const url = 'wss://demo.piesocket.com/v3/channel_1?api_key=oCdCMcMPQpbvNjUIzqtvF1d2X2okWpDQj4AwARJuAgtjhzKxVEjQU6IdCjwm&notify_self'
    connCtx.isConnected ? connCtx.disconnect() : connCtx.connect(url)
    event.preventDefault();
  };

  const btnText = !connCtx.isConnected ? "Connect" : "Disconnect";

  return (
    <form name="connector-form" onSubmit={connectorOnSubmitHandler}>
      <label>Rosbridge address</label>
      <input
        type="url"
        name="rosbridge-address"
        style={{ marginLeft: "10px" }}
      />
      <button type="submit" style={{ marginLeft: "10px" }}>
        {btnText}
      </button>
    </form>
  );
}

export default ConnectionForm;
