import React, {
  PropsWithChildren,
  ReactNode,
  Reducer,
  useReducer,
} from 'react';

import { Ros } from 'roslib';

import ConnectionContext, {
  IConnectionContextState,
  IConnectionContext,
} from './ConnectionContext';

interface IConnectionContextActionConnect {
  type: 'CONNECT';
  payload: Ros | null;
}
interface IConnectionContextAction {
  type: 'DISCONNECT' | 'LOADING';
}

const defaultConnectionState: IConnectionContextState = {
  connection: null,
  isLoading: false,
  isConnected: false,
};
const connectionReducer: Reducer<
  IConnectionContextState,
  IConnectionContextAction | IConnectionContextActionConnect
> = (_state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { connection: null, isConnected: false, isLoading: true };
    case 'CONNECT':
      return {
        connection: action.payload,
        isConnected: true,
        isLoading: false,
      };
    case 'DISCONNECT':
      return { connection: null, isConnected: false, isLoading: false };
  }
  return defaultConnectionState;
};

const ConnectionProvider = (props: PropsWithChildren<ReactNode>) => {
  const [connectionState, dispatchConnectionAction] = useReducer(
    connectionReducer,
    defaultConnectionState
  );

  const connectHandler = (url: string) => {
    const connection = new Ros({ url });
    dispatchConnectionAction({
      type: 'LOADING',
    });
    const onConnectionHandler = (event: Event) => {
      dispatchConnectionAction({
        type: 'CONNECT',
        payload: connection,
      });
    };
    const onErrorHandler = (event: Event) => {
      dispatchConnectionAction({
        type: 'DISCONNECT',
      });
    };
    const onCloseHandler = (event: Event) => {
      dispatchConnectionAction({
        type: 'DISCONNECT',
      });
    };
    connection.on('connection', onConnectionHandler);
    connection.on('error', onErrorHandler);
    connection.on('close', onCloseHandler);
  };

  const disconnectHandler = () => {
    dispatchConnectionAction({
      type: 'LOADING',
    });
    if (connectionState.connection) {
      connectionState.connection.close();
    } else {
      dispatchConnectionAction({
        type: 'DISCONNECT',
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
