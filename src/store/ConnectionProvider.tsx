import React, { Reducer, useReducer } from "react";

import { Ros } from "roslib";

import ConnectionContext, {
  IConnectionContextState,
  IConnectionContext,
} from "./ConnectionContext";

interface IConnectionContextAction {
  type: "CONNECT" | "DISCONNECT" | "LOADING";
  payload: Ros | null;
}

const defaultConnectionState: IConnectionContextState = {
  connection: null,
  isLoading: false,
  isConnected: false,
};
const connectionReducer: Reducer<
  IConnectionContextState,
  IConnectionContextAction
> = (_state: IConnectionContextState, action: IConnectionContextAction) => {
  switch (action.type) {
    case "LOADING":
      return { connection: null, isConnected: false, isLoading: true };
    case "CONNECT":
      return {
        connection: action.payload,
        isConnected: true,
        isLoading: false,
      };
    case "DISCONNECT":
      return { connection: null, isConnected: false, isLoading: false };
  }
  return defaultConnectionState;
};

const ConnectionProvider = (props: any) => {
  const [connectionState, dispatchConnectionAction] = useReducer(
    connectionReducer,
    defaultConnectionState
  );

  const connectHandler = (url: string) => {
    const connection = new Ros({ url });
    dispatchConnectionAction({
      type: "LOADING",
      payload: null,
    });
    const onConnectionHandler = (_event: Event) => {
      dispatchConnectionAction({
        type: "CONNECT",
        payload: connection,
      });
    }
    const closeErrorHandler = (_event: Event) => {
      dispatchConnectionAction({
        type: "DISCONNECT",
        payload: null,
      });
    }
    connection.on('connection', onConnectionHandler);
    connection.on('close', closeErrorHandler);
    connection.on('error', closeErrorHandler);
  };

  const disconnectHandler = () => {
    dispatchConnectionAction({
      type: "LOADING",
      payload: null,
    });
    if (connectionState.connection) {
      connectionState.connection.close();
    } else {
      dispatchConnectionAction({
        type: "DISCONNECT",
        payload: null,
      });
    }
  };

  // This is "mapped" to the context consumer
  const connectionContext: IConnectionContext = {
    connection: connectionState.connection,
    isLoading: connectionState.isLoading,
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
