import { useState, useMemo } from 'react';
import { useModal as _useModal } from 'react-modal-hook';

import { ShowModal, HideModal, ModalComponentFn } from './types';
import { ModalWrapper } from './modal-wrapper';

export const useModal = <Data,>(
  component: ModalComponentFn<Data>,
  inputs: any[] = []
) => {
  const [modalData, setModalData] = useState<Data | undefined>();

  const deps = useMemo(() => [...inputs, modalData], [modalData, inputs]);

  const [showModal, hideModal] = _useModal(
    () => (
      <ModalWrapper {...{ hideModal, component, modalData, setModalData }} />
    ),
    deps
  );

  return useMemo(() => {
    const show: ShowModal<Data> = (data?: Data) => {
      setModalData(data);
      showModal();
    };

    const hide: HideModal = () => {
      hideModal();
      setModalData(undefined);
    };

    return {
      showModal: show,
      hideModal: hide,
    };
  }, [hideModal, showModal, setModalData]);
};
