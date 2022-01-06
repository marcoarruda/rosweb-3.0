import React from "react";

export interface IConnectionContextState {
  connection: WebSocket | null;
  isConnected: boolean;
}

export interface IConnectionContext extends IConnectionContextState {
  connect(url: String): void;
  disconnect(): void;
}

const defaultState: IConnectionContext = {
  connection: null,
  isConnected: false,
  connect: (url: String) => {},
  disconnect: () => {},
};

const ConnectionContext = React.createContext(defaultState);

export default ConnectionContext;