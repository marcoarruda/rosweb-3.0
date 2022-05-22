export interface ModalProps<Data = undefined> {
  modalData?: Data;
  hideModal: HideModal;
}

export type ModalComponentFn<
  Data = undefined,
  T extends ModalProps<Data> = ModalProps<Data>
> = React.FunctionComponent<T>;

export type ShowModal<T> = (modalData?: T) => void;
export type HideModal = () => void;
