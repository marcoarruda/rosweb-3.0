import React from "react";
import { Ros } from "roslib";

export interface IConnectionContextState {
  connection: Ros | null;
  isLoading: boolean,
  isConnected: boolean;
}

export interface IConnectionContext extends IConnectionContextState {
  connect(url: String): void;
  disconnect(): void;
}

const defaultState: IConnectionContext = {
  connection: null,
  isLoading: false,
  isConnected: false,
  connect: (url: String) => {},
  disconnect: () => {},
};

const ConnectionContext = React.createContext(defaultState);

export default ConnectionContext;
