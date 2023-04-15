import { ModalId, useModals } from '@store/modals';
import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { GameEndModal } from './components/GameEndModal/GameEndModal';
import { GameStartModal } from './components/GameStartModal/GameStartModal';
import s from './Modals.module.scss';

const MODAL_ID_MAP: Record<ModalId, FC> = {
  [ModalId.GameEnd]: GameEndModal,
  [ModalId.GameStart]: GameStartModal,
};

export const Modals: FC = () => {
  const { id } = useModals();

  if (!id) {
    return null;
  }

  const ModalComponent = MODAL_ID_MAP[id];

  return ReactDOM.createPortal(
    <div className={s.root}>
      <ModalComponent />
    </div>,
    document.getElementById('modal-root') as Element
  );
};
