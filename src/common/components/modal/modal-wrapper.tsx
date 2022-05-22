import { Suspense } from 'react';

import { ModalComponentFn } from './types';

interface ModalWrapperProps {
  hideModal(): void;
  setModalData(v: any): void;
  modalData: any;
  component: ModalComponentFn<any>;
}

export const ModalWrapper = ({
  hideModal,
  setModalData,
  component: Component,
  modalData,
}: ModalWrapperProps) => {
  const close = () => {
    hideModal();
    setModalData(undefined);
  };

  return (
    <Suspense fallback="">
      <Component hideModal={close} modalData={modalData} />
    </Suspense>
  );
};
