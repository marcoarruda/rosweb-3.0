import { useWorkspaceContext } from 'store/workspace-context';
import { Window } from './window';
import { AddBtn } from './add-btn';

export const Workspace = () => {
  const { windows } = useWorkspaceContext();
  return (
    <>
      <AddBtn />
      {windows.map((item) => (
        <Window window={item} key={item.uuid} />
      ))}
    </>
  );
};
