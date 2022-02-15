import { WorkspaceWindow } from 'common/types/workspace-window';
import { createContext, FC, useContext, useState } from 'react';

export interface WorkspaceContext {
  windows: WorkspaceWindow[];
  updateWindow(uuid: string, window: Partial<WorkspaceWindow>): void;
  addWindow(window: WorkspaceWindow): void;
  removeWindow(uuid: string): void;
}

const noop = () => {};

const Context = createContext<WorkspaceContext>({
  windows: [],
  updateWindow: noop,
  addWindow: noop,
  removeWindow: noop,
});

export const useWorkspaceContext = () => useContext(Context);

export const WorkspaceContextProvider: FC = ({ children }) => {
  const [windows, setWindows] = useState<WorkspaceWindow[]>([]);

  const addWindow: WorkspaceContext['addWindow'] = (window) =>
    setWindows((list) => [...list, window]);

  const removeWindow: WorkspaceContext['removeWindow'] = (uuid) =>
    setWindows((list) => list.filter((w) => w.uuid !== uuid));

  const updateWindow: WorkspaceContext['updateWindow'] = (uuid, window) =>
    setWindows((list) =>
      list.map((w) => (w.uuid === uuid ? { ...w, ...window } : w))
    );

  return (
    <Context.Provider
      value={{
        windows,
        removeWindow,
        addWindow,
        updateWindow,
      }}
    >
      {children}
    </Context.Provider>
  );
};
