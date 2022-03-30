import { useWorkspaceContext } from 'store/workspace-context';

export const AddBtn = () => {
  const { addWindow, windows } = useWorkspaceContext();

  return (
    <button
      onClick={() => {
        const id = windows.length + 1;
        addWindow({
          uuid: String(id),
          title: '',
          rects: {
            width: 100,
            height: 100,
            x: id * 30,
            y: id * 30,
          },
        });
      }}
    >
      add Window
    </button>
  );
};
