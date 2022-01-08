import React, { useContext, useState } from "react";
import useInput from "../hooks/use-input";

import ConnectionContext from "../store/ConnectionContext";

import { websocketRegex } from "../validators/index";

function ConnectionForm() {
  const connCtx = useContext(ConnectionContext);

  const {
    value: address,
    valueIsValid: addressIsValid,
    hasError: addressHasError,
    inputChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: addressReset
  } = useInput((value) => websocketRegex.test(value));

  const connectorOnSubmitHandler = (event: React.FormEvent): any => {
    const url = address;
    connCtx.isConnected ? connCtx.disconnect() : connCtx.connect(url);
    event.preventDefault();
  };

  const isFormValid = addressIsValid;

  const btnText = !connCtx.isConnected ? "Connect" : "Disconnect";

  return (
    <form name="connector-form" onSubmit={connectorOnSubmitHandler}>
      <label>Rosbridge address</label>
      <input
        disabled={connCtx.isLoading || connCtx.isConnected}
        type="url"
        value={address}
        onChange={addressChangeHandler}
        onBlur={addressBlurHandler}
        name="rosbridge-address"
        style={{ marginLeft: "10px" }}
      />
      <button
        disabled={connCtx.isLoading || !isFormValid}
        type="submit"
        style={{ marginLeft: "10px" }}
      >
        {btnText}
      </button>
    </form>
  );
}

export default ConnectionForm;
