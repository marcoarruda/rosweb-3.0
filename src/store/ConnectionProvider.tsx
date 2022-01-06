import React, { Reducer, useReducer } from "react";

import ConnectionContext, {
  IConnectionContextState,
  IConnectionContext,
} from "./ConnectionContext";

interface IConnectionContextAction {
  type: "CONNECT" | "DISCONNECT";
  payload?: WebSocket;
}

const defaultConnectionState: IConnectionContextState = {
  connection: null,
  isConnected: false,
};
const connectionReducer: Reducer<
  IConnectionContextState,
  IConnectionContextAction
> = (_state: IConnectionContextState, _action: IConnectionContextAction) => {
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
      console.log(ev)
      dispatchConnectionAction({
        type: "DISCONNECT"
      });
    };
  };

  const disconnectHandler = () => {};

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
