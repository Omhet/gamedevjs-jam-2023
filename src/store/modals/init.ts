import { closeModal, modalsStore, openModal } from './index';

modalsStore
  //
  .on(openModal, (state, id) => ({ ...state, id }))
  .on(closeModal, (state) => ({ ...state, id: undefined }));
