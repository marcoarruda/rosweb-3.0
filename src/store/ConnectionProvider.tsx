import React, { Reducer, useReducer } from "react";

import ConnectionContext, {
  IConnectionContextState,
  IConnectionContext,
} from "./ConnectionContext";

interface IConnectionContextAction {
  type: "CONNECT" | "DISCONNECT";
  payload: WebSocket | null;
}

const defaultConnectionState: IConnectionContextState = {
  connection: null,
  isConnected: false,
};
const connectionReducer: Reducer<
  IConnectionContextState,
  IConnectionContextAction
> = (_state: IConnectionContextState, action: IConnectionContextAction) => {
  switch (action.type) {
    case "CONNECT":
      return { connection: action.payload, isConnected: true };
    case "DISCONNECT":
      return { connection: null, isConnected: false };
  }
  return defaultConnectionState;
};

const ConnectionProvider = (props: any) => {
  const [connectionState, dispatchConnectionAction] = useReducer(
    connectionReducer,
    defaultConnectionState
  );

  const connectHandler = (url: string) => {
    const connection = new WebSocket(url);
    connection.onopen = (ev) => {
      console.log(ev);
      dispatchConnectionAction({
        type: "CONNECT",
        payload: connection,
      });
    };
    connection.onclose = connection.onerror = (ev) => {
      console.log(ev);
      dispatchConnectionAction({
        type: "DISCONNECT",
        payload: null,
      });
    };
  };

  const disconnectHandler = () => {
    connectionState.connection?.close();
  };

  // This is "mapped" to the context consumer
  const connectionContext: IConnectionContext = {
    connection: connectionState.connection,
    isConnected: connectionState.isConnected,
    connect: connectHandler,
    disconnect: disconnectHandler,
  };

  // returns context component
  return (
    <ConnectionContext.Provider value={connectionContext}>
      {props.children}
    </ConnectionContext.Provider>
  );
};

export default ConnectionProvider;
