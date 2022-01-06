import React from 'react'

function Connector() {
  const connectorOnSubmitHandler = (event: React.FormEvent): any => {
    event.preventDefault();
  };

  return (
    <form name="connector-form" onSubmit={connectorOnSubmitHandler}>
      <label>Rosbridge address</label>
      <input
        type="url"
        name="rosbridge-address"
        style={{ marginLeft: "10px" }}
      />
      <button type="submit" style={{ marginLeft: "10px" }}>
        Connect
      </button>
    </form>
  );
}

export default Connector;
