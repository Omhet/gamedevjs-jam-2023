import { closeModal, modalsStore, openModal } from './modalsStore'

modalsStore
    //
    .on(openModal, (state, id) => ({ ...state, id }))
    .on(closeModal, (state) => ({ ...state, id: undefined }))
