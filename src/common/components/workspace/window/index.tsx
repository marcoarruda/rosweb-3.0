import { WorkspaceWindow } from 'common/types/workspace-window';
import { Rnd } from 'react-rnd';
import { useWorkspaceContext } from 'store/workspace-context';

interface WindowProps {
  window: WorkspaceWindow;
}
export const Window = ({ window }: WindowProps) => {
  const { width, height, x, y } = window.rects;
  const { updateWindow } = useWorkspaceContext();
  return (
    <Rnd
      style={{ backgroundColor: 'tomato' }}
      size={{
        width,
        height,
      }}
      position={{ x, y }}
      onDragStop={(e, { x, y }) => {
        updateWindow(window.uuid, { rects: { width, height, x, y } });
      }}
      onResize={(e, direction, ref) => {
        updateWindow(window.uuid, {
          rects: { width: ref.offsetWidth, height: ref.offsetHeight, x, y },
        });
      }}
    >
      {window.uuid}
    </Rnd>
  );
};
